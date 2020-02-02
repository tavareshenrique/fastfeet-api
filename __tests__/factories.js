import { factory } from 'factory-girl';

import fakerUser from './utils/faker/fakerUser';

import User from '../src/app/models/User';

factory.define('User', User, fakerUser);

module.exports = factory;
