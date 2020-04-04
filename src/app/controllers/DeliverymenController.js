import { Op } from 'sequelize';
import crypto from 'crypto';

import Deliverymen from '../models/Deliverymen';
import File from '../models/File';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Signature from '../models/Signature';

import OrderPaginateService from '../services/OrderPaginateService';

import Cache from '../../lib/Cache';

import {
  ERROR_DELIVERYMEN_NOT_FOUND,
  ERROR_DELIVERYMEN_ALREADY_EXISTS,
} from '../utils/errorMessages';

class DeliverymenController {
  async index(req, res) {
    const { name: nameParam, id: idParam } = req.query;

    let where = null;
    if (nameParam && idParam) {
      where = {
        name: {
          [Op.iLike]: `%${nameParam}%`,
        },
        id: idParam,
      };
    } else if (nameParam && !idParam) {
      where = {
        name: {
          [Op.iLike]: `%${nameParam}%`,
        },
      };
    } else if (!nameParam && idParam) {
      where = {
        id: idParam,
      };
    }

    const deliverymen = await Deliverymen.findAll({
      where,
      attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
      order: [['id', 'ASC']],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;
    const { delivered, page = 1 } = req.query;

    const cacheKey = `deliveryman:${id}:${page}:${delivered || false}`;

    const orderCount = await OrderPaginateService.run({
      id,
      delivered,
    });

    res.header('X-Total-Page-Count', Math.ceil(orderCount / 5));

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const order = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: delivered
          ? {
              [Op.not]: null,
            }
          : null,
      },
      order: [['updated_at', 'DESC']],
      attributes: ['id', 'product', 'start_date', 'end_date'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    await Cache.set(cacheKey, order);

    return res.json(order);
  }

  async store(req, res) {
    const { name, email, avatar_id } = req.body;
    const cryptoId = await crypto.randomBytes(4).toString('HEX');
    const id = cryptoId.toUpperCase();

    await Deliverymen.create({ id, name, email, avatar_id });

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;

    const deliveryman = await Deliverymen.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({
        error: ERROR_DELIVERYMEN_NOT_FOUND,
      });
    }

    if (email !== deliveryman.email) {
      const userExists = await Deliverymen.findOne({
        where: {
          email,
        },
      });

      if (userExists) {
        return res.status(400).json({
          error: ERROR_DELIVERYMEN_ALREADY_EXISTS,
        });
      }
    }

    await deliveryman.update(req.body);

    const { name, avatar } = await Deliverymen.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliverymen = await Deliverymen.findByPk(id);

    await deliverymen.destroy();

    return res.send();
  }
}

export default new DeliverymenController();
