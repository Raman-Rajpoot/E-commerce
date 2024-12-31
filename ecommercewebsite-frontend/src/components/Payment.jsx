import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css'; // Make sure to adjust styles here
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51QY8HkGCqFzyJKI3OYq2p0FhCAC5AFsDSFjK5xSOPDg6Pu9V3ezbh7TUOiy8eYAyRjlPjn5ZRRexu0KQ9OdLy6mX00YGsxnrTh');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const location = useLocation();
    const { totalPrice } = location.state || {}; 
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await fetch('http://localhost:7000/api/v1/payment/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ totalPrice: totalPrice * 100 }) 
            });

            if (!response.ok) {
                throw new Error('Failed to fetch payment intent');
            }

            const { clientSecret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-form">
            <h2>Complete Your Payment</h2>
            {!paymentSuccess ? (
                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="input-group">
                        <label htmlFor="card-element">Card Details</label>
                        <CardElement id="card-element" />
                    </div>
                    
                    <button type="submit" disabled={!stripe || loading} className='btn'>
                        {loading ? `Processing...` : `Pay $ ${totalPrice}`}
                    </button>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                </form>
            ) : (
                <h3>Payment Successful! Thank you for your purchase.</h3>
            )}
        </div>
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}>
        <CheckoutForm />
    </Elements>
);

export default Payment;
