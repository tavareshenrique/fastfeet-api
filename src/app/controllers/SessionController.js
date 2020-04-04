import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

import {
  ERROR_USER_NOT_FOUND,
  ERROR_PASSWORD_DOES_NOT_MATCH,
} from '../utils/errorMessages';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: ERROR_USER_NOT_FOUND });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: ERROR_PASSWORD_DOES_NOT_MATCH });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
