import '../../src/database';

import truncate from '../utils/truncate';

import GenerateIdService from '../../src/app/services/GenerateIdService';

describe('GenerateId', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should generate the random id', async () => {
    const id = await GenerateIdService.run();

    expect(id).toHaveLength(8);
  });
});
