import User from '../../src/app/models/User';

describe('Authentication', () => {
  it('should auth', async () => {
    const userCreate = await User.create({
      name: 'Henrique',
      email: 'henrique@gmail.com',
      password: '123456',
    });

    expect(userCreate.email).toBe('ihenrits@gmail.com');
  });
});
