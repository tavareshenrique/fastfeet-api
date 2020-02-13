import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliverymen'
      }
    );

    return this;
  }
}

export default Deliverymen;
