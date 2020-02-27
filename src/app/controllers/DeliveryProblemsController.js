import DeliveryProblems from '../models/DeliveryProblems';
import Order from '../models/Order';
import Deliverymen from '../models/Deliverymen';

import CancelDelivery from '../jobs/CancelDelivery';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const deliveryProblems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
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

    const deliveryProblems = await DeliveryProblems.findByPk(id, {
      attributes: ['id', 'description'],
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
        .json({ error: 'Delivery Problem for this order doesnt exists.' });
    }

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    await DeliveryProblems.create({
      delivery_id: id,
      description,
    });

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

    return res.send();
  }
}

export default new DeliveryProblemsController();
