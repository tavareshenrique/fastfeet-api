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

import {
  ERROR_ORDER_NOT_FOUND,
  ERROR_START_TIME_NOT_ALLOWED,
  ERROR_START_DELIVERY_ORDER_AT_FUTURE_DATE,
  ERROR_START_DATE_HAS_PASSED,
  ERROR_MAXIMUM_NUMBER_TAKEN,
  ERROR_SIGNATURE_NOT_INFORMED,
  ERROR_NOT_POSSIBLE_DELIVER_AT_FUTURE_DATE,
  ERROR_DELIVERY_DATE_HAS_PASSED,
} from '../utils/errorMessages';

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
      return res.status(400).json({ error: ERROR_ORDER_NOT_FOUND });
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
          error: ERROR_START_DELIVERY_ORDER_AT_FUTURE_DATE,
        });
      }

      if (isBefore(startDate, dateNow)) {
        return res.status(400).json({
          error: ERROR_START_DATE_HAS_PASSED,
        });
      }

      const orderDeliverymanCount = await Order.count({
        where: {
          deliveryman_id: idDeliveryman,
          start_date: parseISO(start_date),
        },
      });

      if (hourStart < 8 || hourStart > 18) {
        return res.status(400).json({ error: ERROR_START_TIME_NOT_ALLOWED });
      }

      if (orderDeliverymanCount > 5) {
        return res.status(400).json({
          error: ERROR_MAXIMUM_NUMBER_TAKEN,
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
          error: ERROR_NOT_POSSIBLE_DELIVER_AT_FUTURE_DATE,
        });
      }

      if (isBefore(endDate, dateNow)) {
        return res.status(400).json({
          error: ERROR_DELIVERY_DATE_HAS_PASSED,
        });
      }

      if (!signature_id) {
        return res.status(400).json({ error: ERROR_SIGNATURE_NOT_INFORMED });
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
