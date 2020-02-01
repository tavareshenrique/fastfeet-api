import { factory } from 'factory-girl';

import fakerUser from './utils/faker/fakerUser';
import fakerRecipient from './utils/faker/fakerRecipient';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';

factory.define('User', User, fakerUser);

factory.define('Recipient', Recipient, fakerRecipient);

module.exports = factory;
