import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import "./CheckoutForm.css";
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const CheckoutForm = ({ bookingData, close }) => {

    const { user } = useAuth();

    const [clientSecret, setClientSecret] = useState("");

    const axiosSecure = useAxiosSecure();

    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        if (bookingData?.price) {
            getClientSecret({ price: bookingData?.price })
        }
    }, [bookingData?.price]);

    const getClientSecret = async (price) => {
        const { data } = await axiosSecure.post(`/create-payment-intent?email=${user?.email}`, price)
        setClientSecret(data.clientSecret);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            return toast.error(error)
        }

        const { error: confirmationError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: bookingData?.user?.email,
                    name: bookingData?.user?.name,
                }
            }
        })

        if (confirmationError) {
            return toast.error(confirmationError.message);
        }

        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                ...bookingData,
                transactionId: paymentIntent.id,
                data: new Date()
            }

            try {
                await axiosSecure.post(`/payment?email=${user?.email}`, paymentInfo);
                close();
                Swal.fire({
                    title: "Success",
                    text: `Payment success! Your Trx id : ${paymentIntent.id}` ,
                    icon: "success"
                });
                
            } catch (error) {
                toast.error(error.message);
            }
        }

    };

    return (
        <form onSubmit={handleSubmit} className='p-5'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className='text-right'>
                <button className='bg-green-400 text-white px-3 py-2 rounded-lg mt-12' type="submit" disabled={!stripe}>
                    Pay ${bookingData.price}
                </button>
            </div>
        </form>
    );
};

CheckoutForm.propTypes = {
    bookingData: PropTypes.object,
    close: PropTypes.func
};

export default CheckoutForm;