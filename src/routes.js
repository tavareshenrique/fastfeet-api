import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymenController from './app/controllers/DeliverymenController';
import SignatureController from './app/controllers/SignatureController';
import OrderController from './app/controllers/OrderController';
import OrderStatusController from './app/controllers/OrderStatusController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';
import validateDeliverymanStore from './app/validators/DeliverymanStore';
import validateDeliverymanUpdate from './app/validators/DeliverymanUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateDeliveryProblemsStore from './app/validators/DeliveryProblemsStore';
import validateOrderStatusUpdate from './app/validators/OrderStatusUpdate';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);
routes.get('/deliverymen', DeliverymenController.index);
routes.get('/deliverymen/:id/deliveries', DeliverymenController.show);
routes.get('/delivery/:id/problems', DeliveryProblemsController.show);

routes.use(authMiddleware);

// Update Users
routes.put('/users', validateUserUpdate, UserController.update);

// Recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

// Deliverymen
routes.post(
  '/deliverymen',
  validateDeliverymanStore,
  DeliverymenController.store
);
routes.put(
  '/deliverymen/:id',
  validateDeliverymanUpdate,
  DeliverymenController.update
);
routes.put(
  '/deliverymen/:idDeliveryman/orders/:idOrder/status',
  validateOrderStatusUpdate,
  OrderStatusController.update
);
routes.delete('/deliverymen/:id', DeliverymenController.delete);

// Orders
routes.get('/orders', OrderController.index);
routes.get('/orders/:id', OrderController.show);
routes.post('/orders', validateOrderStore, OrderController.store);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

// Delivery
routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.post(
  '/delivery/:id/problems',
  validateDeliveryProblemsStore,
  DeliveryProblemsController.store
);
routes.delete(
  '/delivery/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

// Files && Signature
routes.post('/files', upload.single('file'), FileController.store);
routes.post(
  '/signatures',
  upload.single('signatures'),
  SignatureController.store
);

export default routes;
