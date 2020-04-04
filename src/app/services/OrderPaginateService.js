import { Op } from 'sequelize';
import Order from '../models/Order';

class OrderPaginateService {
  async run({ id, delivered }) {
    const count = await Order.count({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: delivered
          ? {
              [Op.not]: null,
            }
          : null,
      },
    });

    return count;
  }
}

export default new OrderPaginateService();
