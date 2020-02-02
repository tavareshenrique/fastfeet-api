import faker from 'faker';

module.exports = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};
