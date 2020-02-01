import faker from 'faker';

module.exports = {
  name: faker.company.companyName(),
  street: faker.address.streetAddress(),
  number: faker.random.number(),
  complement: faker.address.secondaryAddress(),
  state: faker.address.state(),
  city: faker.address.city(),
  zipcode: faker.address.zipCode(),
};
