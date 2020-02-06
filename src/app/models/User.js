import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10);
        user.password_hash = await bcrypt.hash(user.password, salt);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  }
}

export default User;
