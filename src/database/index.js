import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/File';
import Deliverymen from '../app/models/Deliverymen';
import Signature from '../app/models/Signature';
import Order from '../app/models/Order';

import databaseConfig from '../config/database';

const models = [User, Recipient, File, Deliverymen, Signature, Order];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
