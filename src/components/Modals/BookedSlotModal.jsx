import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import PropTypes from 'prop-types';
import { Fragment } from "react";

const BookedSlotModal = ({ isOpen, close, bookedUser }) => {

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
                                
                                <div>
                                    <h3 className="text-3xl font-medium border-b-2 pb-3 border-black mb-6">Booked By : </h3>
                                    <p><span className="font-medium">Name : </span>{bookedUser?.name}</p>
                                    <p className="my-3"><span className="font-medium ">Email : </span>{bookedUser?.email}</p>
                                    <p><span className="font-medium">Class : </span>{bookedUser?.class_name}</p>
                                    <div className="mt-8 mb-3 text-right">
                                        <button className="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer" onClick={close}>Close</button>
                                    </div>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


BookedSlotModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    bookedUser: PropTypes.object,
};

export default BookedSlotModal;