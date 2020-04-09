import { factory } from 'factory-girl';

import faker from 'faker';

import GenerateIdService from '../src/app/services/GenerateIdService';

import User from '../src/app/models/User';
import Deliverymen from '../src/app/models/Deliverymen';
import Recipient from '../src/app/models/Recipient';
import Order from '../src/app/models/Order';
import DeliveryProblems from '../src/app/models/DeliveryProblems';

function getId() {
  return GenerateIdService.run();
}

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Deliverymen', Deliverymen, {
  id: getId(),
  name: faker.name.findName(),
  email: faker.internet.email(),
});

factory.define('Recipient', Recipient, {
  name: faker.name.findName(),
  street: faker.address.streetAddress(),
  number: faker.random.number(),
  complement: faker.address.streetName(),
  state: faker.address.state(),
  city: faker.address.city(),
  zipcode: faker.address.zipCode(),
});

factory.define('Order', Order, {
  product: faker.name.findName(),
  recipient_id: 1,
  deliveryman_id: '360BFD1D',
  start_date: new Date(),
});

factory.define('DeliveryProblems', DeliveryProblems, {
  description: faker.name.findName(),
});

module.exports = factory;
