import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import PropTypes from 'prop-types';
import { Fragment } from "react";

const BookedTrainerModal = ({ isOpen, close, info }) => {

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
                            <DialogPanel className="w-full max-w-md rounded-xl border-[#DC5F00] border bg-gray-50 p-6">

                                {
                                    info && <div className="p-4 md:p-6 flex flex-col gap-3 lg:gap-4 text-gray-700">
                                        <p><span className="font-semibold">Trainer Name : {info?.trainer?.name}</span></p>
                                        <p><span className="font-semibold">Trainer Email : {info?.trainer?.email}</span></p>
                                        <div className="h-[1px] w-full bg-gray-700"></div>
                                        <p><span className="font-semibold">Package : <span className="text-green-500">{info?.pkg}</span></span></p>
                                        <p><span className="font-semibold">Price : {info?.price} $</span></p>
                                        <p><span className="font-semibold">Trx Id : {info?.trxId}</span></p>
                                        <div className="mt-5 text-right">
                                            <button onClick={close} className="px-3 py-2 bg-red-500 text-white rounded-lg">Close</button>
                                        </div>
                                    </div>
                                }

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


BookedTrainerModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    info: PropTypes.object,
};

export default BookedTrainerModal;