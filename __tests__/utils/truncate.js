import User from '../../src/app/models/User';
import Recipient from '../../src/app/models/Recipient';

module.exports = async () => {
  await User.destroy({ truncate: true, force: true });
  await Recipient.destroy({ truncate: true, force: true });
};

// import database from '../../src/database';

// export default function truncate() {
//   return Promise.all(
//     Object.keys(database.connection.models).map(key => {
//       return database.connection.models[key].destroy({
//         truncate: true,
//         force: true,
//       });
//     })
//   );
// }
