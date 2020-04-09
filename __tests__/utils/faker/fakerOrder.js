import faker from 'faker';

function createOrder(idRecipient, idDeliverymean) {
  return {
    product: faker.commerce.product(),
    recipient_id: idRecipient,
    deliveryman_id: idDeliverymean,
  };
}

module.exports = {
  createOrder,
};
