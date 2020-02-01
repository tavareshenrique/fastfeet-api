import '../../src/database';

import bcrypt from 'bcryptjs';
import truncate from '../utils/truncate';

import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const dataUser = {
      name: 'Henrique',
      email: 'ihenrits@gmail.com',
      password: '123456',
    };

    const user = await User.create(dataUser);

    const password = await bcrypt.compare(
      dataUser.password,
      user.password_hash
    );

    expect(password).toBe(true);
  });
});
