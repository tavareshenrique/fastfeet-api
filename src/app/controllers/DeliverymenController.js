import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
  async store(req, res) {
    const { name, email } = await Deliverymen.create(req.body);

    return res.json({
      name,
      email,
    });
  }
}

export default new DeliverymenController();
