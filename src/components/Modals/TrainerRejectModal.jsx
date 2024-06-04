import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";

import PropTypes from 'prop-types';
import { Fragment } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TrainerRejectModal = ({ isOpen, close, trainer, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { mutateAsync: rejectAsTrainer } = useMutation({
        mutationFn: async (updatedInfo) => {
            const { data } = await axiosSecure.patch(`/updateAppliedTrainersReject?email=${user?.email}`, updatedInfo);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            if (data.modifiedCount === 1) {
                toast.success("Applied changes successfully.");
                refetch();
                close();
            } else {
                close();
                toast.error("Something went wrong!");
            }
        }
    })

    const handleReject = async (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;
        if (!feedback) return toast.error("Please give a feedback!!");
        const updatedInfo = {
            ...trainer, feedback, status: 'rejected'
        };

        delete updatedInfo._id;

        try {
            await rejectAsTrainer(updatedInfo);
            refetch();
        } catch (error) {
            close();
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
                            <DialogPanel className="w-full max-w-md rounded-xl border bg-white  p-6">
                                <div className="flex flex-col gap-2 opacity-70">
                                    <p className="text-lg font-medium border-b-2 border-green-300 mb-2">Applied Trainer Details : </p>
                                    <img src={trainer?.image} className="object-cover w-[130px] h-[150px]" alt="" />
                                    <p>Name : {trainer?.name}</p>
                                    <p>Email : {trainer?.email}</p>
                                    <p>Age : {trainer?.age}</p>
                                    <p>Experience : {trainer?.experience} Year</p>
                                    <p>Class Time : {trainer?.availableTime}</p>
                                    <p>Class Duration : {trainer?.classDuration} hr</p>
                                    <p>Available Days : {trainer?.availableDays && trainer?.availableDays.map((day, i) => <span key={i}> {day.value} </span>)}</p>
                                    <p>Skills : {trainer?.skills && trainer?.skills.map((skill, i) => <span key={i}>&apos; {skill.value}&apos; </span>)}</p>
                                    <p>Biography : {trainer?.biography}</p>
                                </div>
                                <form onSubmit={handleReject} className="mt-4">
                                    <div>
                                        <textarea className="w-full h-28 p-3 border border-gray-500 rounded-lg" name="feedback" id="" placeholder="Type your feedback here..."></textarea>
                                    </div>
                                    <div className="text-right mt-4">
                                        <button type="submit" className="px-4 py-2 bg-green-400 text-lg font-medium text-white rounded-lg">Submit</button>
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


TrainerRejectModal.propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func,
    refetch: PropTypes.func,
    trainer: PropTypes.object,
};

export default TrainerRejectModal;