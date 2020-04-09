import faker from 'faker';

import GenerateIdService from '../../../src/app/services/GenerateIdService';

function getId() {
  return GenerateIdService.run();
}

module.exports = {
  id: getId(),
  name: faker.name.findName(),
  email: faker.internet.email(),
};
