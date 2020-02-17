import { factory } from 'factory-girl';

import faker from 'faker';

import User from '../src/app/models/User';
import Deliverymen from '../src/app/models/Deliverymen';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Deliverymen', Deliverymen, {
  name: faker.name.findName(),
  email: faker.internet.email(),
});

module.exports = factory;
