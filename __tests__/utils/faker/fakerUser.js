import faker from 'faker';

module.exports = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
