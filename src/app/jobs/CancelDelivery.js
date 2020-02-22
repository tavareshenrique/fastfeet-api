import Mail from '../../lib/Mail';

class CancelDelivery {
  get key() {
    return 'CancelDelivery';
  }

  async handle({ data }) {
    const { deliveryman, product, email } = data;

    console.log(data);

    await Mail.sendMail({
      to: `${deliveryman} <${email}>`,
      subject: 'Entrega de Produto Cancelada',
      template: 'cancelDelivery',
      context: {
        deliveryman,
        product,
      },
    });
  }
}

export default new CancelDelivery();
