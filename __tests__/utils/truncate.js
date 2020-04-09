import Deliverymen from '../../src/app/models/Deliverymen';
import DeliveryProblems from '../../src/app/models/DeliveryProblems';
import File from '../../src/app/models/File';
import Order from '../../src/app/models/Order';
import Recipient from '../../src/app/models/Recipient';
import Signature from '../../src/app/models/Signature';
import User from '../../src/app/models/User';

module.exports = async () => {
  await Signature.destroy({ truncate: true, force: true });
  await File.destroy({ truncate: true, force: true });
  await DeliveryProblems.destroy({ truncate: true, force: true });
  await Order.destroy({ truncate: true, force: true });
  await Recipient.destroy({ truncate: true, force: true });
  await Deliverymen.destroy({ truncate: true, force: true });
  await User.destroy({ truncate: true, force: true });
};

// import database from '../../src/database';

// export default function truncate() {
//   return Promise.all(
//     Object.keys(database.connection.models).map(key => {
//       return database.connection.models[key].destroy({
//         where: {},
//         truncate: true,
//         force: true,
//       });
//     })
//   );
// }
