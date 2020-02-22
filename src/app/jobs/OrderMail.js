import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const {
      nameDeliveryman,
      nameRecipient,
      email,
      product,
      street,
      number,
      complement,
      state,
      city,
      zipcode,
    } = data;

    await Mail.sendMail({
      to: `${nameDeliveryman} <${email}>`,
      subject: 'Produto disponível para entrega',
      template: 'order',
      context: {
        deliveryman: nameDeliveryman,
        product,
        recipient: nameRecipient,
        street,
        number,
        complement,
        state,
        city,
        zipcode,
      },
    });
  }
}

export default new OrderMail();
