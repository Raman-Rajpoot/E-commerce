import express from 'express';
import { createPaymentIntent, webhookHandler } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent', createPaymentIntent);
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

export default paymentRouter;
