import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email()
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6),
    });

    schema.validate(req.body, { abortEarly: false }).catch(e => {
      return res.status(400).json({ error: e.errors });
    });

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
