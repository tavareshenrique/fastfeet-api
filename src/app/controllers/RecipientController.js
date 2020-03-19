import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
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

    const recipient = await Recipient.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    await recipient.destroy();

    return res.send();
  }
}

export default new RecipientController();
