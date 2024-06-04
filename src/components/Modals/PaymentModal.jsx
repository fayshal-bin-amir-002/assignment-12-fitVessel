import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PropTypes from 'prop-types';
import { Fragment } from "react";
import CheckoutForm from "./CheckoutForm";

const PaymentModal = ({ isOpen, close, bookingData }) => {

    const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK}`);

    return (
        <Transition appear show={isOpen}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 transform-[scale(95%)]"
                            enterTo="opacity-100 transform-[scale(100%)]"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 transform-[scale(100%)]"
                            leaveTo="opacity-0 transform-[scale(95%)]"
                        >
                            <DialogPanel className="w-full max-w-md rounded-xl border-[#DC5F00] border bg-green-50  p-6">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm close={close} bookingData={bookingData} />
                                </Elements>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


PaymentModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    refetch: PropTypes.func,
    user: PropTypes.object,
    bookingData: PropTypes.object,
};

export default PaymentModal;