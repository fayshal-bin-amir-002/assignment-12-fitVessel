import { Button, Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";

import PropTypes from 'prop-types';
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Fragment } from "react";
import { uploadImage } from "../../utils/imageUpload";

const UpdateProfileModal = ({ isOpen, close, user, refetch }) => {

    const { updateUserProfile } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.files[0];

        try {
            if (photo) {
                const img_url = await uploadImage(photo)
                await updateUserProfile(name, img_url)
            } else {
                await updateUserProfile(name, user?.photoURL);
            }
            refetch();
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.message);
        }
    }

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
                            <DialogPanel className="w-full max-w-md rounded-xl border-[#DC5F00] border bg-[#ee9857]  p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <small>Name</small>
                                        <input type="text" name="name" id="" className="border border-gray-500 rounded-lg w-full p-2" defaultValue={user?.displayName} />
                                    </div>
                                    <div>
                                        <small>Photo</small>
                                        <input type="file" name="photo" id="" className="border border-gray-500 rounded-lg w-full p-2" />
                                    </div>
                                    <div className="mt-4 text-right">
                                        <Button type="submit"
                                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                            onClick={close}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


UpdateProfileModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    refetch: PropTypes.func,
    user: PropTypes.object,
};

export default UpdateProfileModal;