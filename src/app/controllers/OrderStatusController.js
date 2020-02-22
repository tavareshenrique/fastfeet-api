import {
  parseISO,
  getHours,
  getDate,
  getMonth,
  getYear,
  isAfter,
  isBefore,
} from 'date-fns';

import Order from '../models/Order';
import Deliverymen from '../models/Deliverymen';
import Recipient from '../models/Recipient';
import Signature from '../models/Signature';

class OrderStatusController {
  async update(req, res) {
    const { start_date, end_date, signature_id } = req.body;
    const { idDeliveryman, idOrder } = req.params;

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);

    const order = await Order.findByPk(idOrder, {
      where: {
        deliveryman_id: idDeliveryman,
      },
    });

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    if (start_date) {
      const hourStart = getHours(parseISO(start_date));

      const startDay = getDate(parseISO(start_date));
      const startMonth = getMonth(parseISO(start_date));
      const startYear = getYear(parseISO(start_date));

      const startDate = new Date(startYear, startMonth, startDay);
      startDate.setHours(0, 0, 0, 0);

      if (isAfter(startDate, dateNow)) {
        return res.status(400).json({
          error:
            'It is not possible to start delivery of an order at a future date.',
        });
      }

      if (isBefore(startDate, dateNow)) {
        return res.status(400).json({
          error: 'Start date has passed.',
        });
      }

      const orderDeliverymanCount = await Order.count({
        where: {
          deliveryman_id: idDeliveryman,
          start_date: parseISO(start_date),
        },
      });

      if (hourStart < 8 || hourStart > 18) {
        return res.status(400).json({ error: 'Start time not allowed.' });
      }

      if (orderDeliverymanCount > 5) {
        return res.status(400).json({
          error: 'Maximum number of taken per day reached (5).',
        });
      }
    }

    if (end_date) {
      const endDay = getDate(parseISO(end_date));
      const endMonth = getMonth(parseISO(end_date));
      const endYear = getYear(parseISO(end_date));

      const endDate = new Date(endYear, endMonth, endDay);
      endDate.setHours(0, 0, 0, 0);

      if (isAfter(endDate, dateNow)) {
        return res.status(400).json({
          error: 'It is not possible to deliver an order at a future date.',
        });
      }

      if (isBefore(endDate, dateNow)) {
        return res.status(400).json({
          error: 'Delivery date has passed.',
        });
      }

      if (!signature_id) {
        return res.status(400).json({ error: 'Signature not informed.' });
      }
    }

    await order.update(req.body);

    const orderUpdate = await Order.findByPk(idOrder, {
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(orderUpdate);
  }
}

export default new OrderStatusController();
