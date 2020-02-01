import User from '../../src/app/models/User';
import Recipient from '../../src/app/models/Recipient';

module.exports = async () => {
  await User.destroy({ truncate: true, force: true });
  await Recipient.destroy({ truncate: true, force: true });
};
