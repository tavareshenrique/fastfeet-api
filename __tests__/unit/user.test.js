import '../../src/database';

import bcrypt from 'bcryptjs';
import truncate from '../utils/truncate';

import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const password = '123123';

    const user = await factory.create('User', {
      password,
    });

    const passwordCompare = await bcrypt.compare(password, user.password_hash);

    expect(passwordCompare).toBe(true);
  });
});
