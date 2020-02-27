import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      product: Yup.string().required('Product is required'),
      recipient_id: Yup.number().required('Recpient is required'),
      deliveryman_id: Yup.number().required('Deliveryman is required'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
