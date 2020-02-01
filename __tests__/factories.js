import { factory } from 'factory-girl';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: 'Henrique',
  email: 'ihenrits@gmail.com',
  password: '123456',
});

module.exports = factory;
