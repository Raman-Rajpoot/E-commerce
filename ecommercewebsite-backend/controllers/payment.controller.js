import dotenv from "dotenv";

dotenv.config(
    { path: './.env' }
);
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export const createPaymentIntent = async (req, res) => {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Amount is required and must be a valid number.' });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            payment_method_types: ['card'],
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
    }
};

export const webhookHandler = (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        switch (event.type) {
            case 'payment_intent.succeeded':
                console.log('Payment succeeded:', event.data.object);
                break;
            case 'payment_intent.payment_failed':
                console.log('Payment failed:', event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook Error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};
