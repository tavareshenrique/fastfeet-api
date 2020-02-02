import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.string().required('Number is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      zipcode: Yup.string().required('ZIP Code is required'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
