import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliverymen from '../models/Deliverymen';

import CancelDelivery from '../jobs/CancelDelivery';
import Queue from '../../lib/Queue';
import Cache from '../../lib/Cache';

import { ERROR_DELIVERY_PROBLEM_DOESNT_EXISTS } from '../utils/errorMessages';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      order: [['id', 'ASC']],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'start_date',
            'end_date',
            'canceled_at',
          ],
        },
      ],
    });

    return res.json(deliveryProblems);
  }

  async show(req, res) {
    const { id } = req.params;

    const cached = await Cache.get('problems');

    if (cached) {
      return res.json(cached);
    }

    const deliveryProblems = await DeliveryProblems.findAll({
      where: {
        delivery_id: id,
      },
      attributes: ['id', 'description', 'created_at'],
      order: [['id', 'ASC']],
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'start_date',
            'end_date',
            'canceled_at',
          ],
        },
      ],
    });

    if (!deliveryProblems) {
      return res
        .status(400)
        .json({ error: ERROR_DELIVERY_PROBLEM_DOESNT_EXISTS });
    }

    await Cache.set('problems', deliveryProblems);

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    await DeliveryProblems.create({
      delivery_id: id,
      description,
    });

    await Cache.invalidate('problems');

    return res.json({ id, description });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymenProblems = await DeliveryProblems.findByPk(id);

    const order = await Order.findByPk(id, {
      attributes: ['id', 'product'],
      include: [
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await deliverymenProblems.destroy();

    await Queue.add(CancelDelivery.key, {
      deliveryman: order.deliveryman.name,
      email: order.deliveryman.email,
      product: order.product,
    });

    await Cache.invalidate('problems');

    return res.send();
  }
}

export default new DeliveryProblemsController();
