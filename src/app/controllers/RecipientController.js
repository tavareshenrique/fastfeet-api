import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.string().required('Number is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      zipcode: Yup.string().required('ZIP Code is required'),
    });

    schema.validate(req.body, { abortEarly: false }).catch(e => {
      return res.status(400).json({ error: e.errors });
    });

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    });
  }
}

export default new RecipientController();
