import Deliverymen from '../models/Deliverymen';
import File from '../models/File';

class DeliverymenController {
  async index(req, res) {
    const deliverymen = await Deliverymen.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const { name, email } = await Deliverymen.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;

    const deliveryman = await Deliverymen.findByPk(id);

    if (email !== deliveryman.email) {
      const userExists = await Deliverymen.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Deliveryman already exists.' });
      }
    }

    await deliveryman.update(req.body);

    const { id: idDeliveryman, name, avatar } = await Deliverymen.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id: idDeliveryman,
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
