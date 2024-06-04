import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import BookedSlotModal from "../../../Modals/BookedSlotModal";

const ManageSlots = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [slotBookUser, setSlotBookUser] = useState({})

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: slots = [], isLoading } = useQuery({
        queryKey: ['my-slots', user?.email],
        enabled: !!user && !loading,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myadded-slots/${user?.email}?email=${user?.email}`)
            return data;
        }
    })

    function open(user) {
        setSlotBookUser(user);
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="overflow-x-auto mt-8 md:mt-12 lg:mt-16">
                {
                    slots.length === 0 ? <p className="text-center py-8 text-4xl text-red-400">No Available slot!</p> :
                        <table className=" w-[800px] overflow-x-auto border-collapse border border-blue-500 mx-auto">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-3 px-4 text-left">Day</th>
                                    <th className="py-3 px-4 text-left">Slot Name</th>
                                    <th className="py-3 px-4 text-left">Slot Time</th>
                                    <th className="py-3 px-4 text-left">Classes</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    slots.map((slot, i) => <tr key={i} className="bg-white border-b border-blue-500">
                                        <td className="py-3 px-4">{slot.day}</td>
                                        <td className="py-3 px-4">{slot.slotName}</td>
                                        <td className="py-3 px-4">{slot.slotTime} hr</td>
                                        <td className="py-3 px-4">
                                            {
                                                slot.classesName.map((c, i) => <span className="text-xs mr-2 border border-red-100 font-medium rounded text-green-500" key={i}>{c.value}</span>)
                                            }
                                        </td>
                                        <td className={`${slot.status === 'booked' ? 'text-red-500' : 'text-green-500'} py-3 px-4 capitalize`}>{slot.status}</td>
                                        <td className="py-3 px-4 min-w-[120px]">
                                            <button onClick={() => open(slot.bookedBy)} className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-300 text-white disabled:cursor-not-allowed disabled:bg-gray-500 " disabled={slot.status !== 'booked'}><IoEyeOutline className="text-xl" /></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                }
            </div>
            <BookedSlotModal isOpen={isOpen} close={close} bookedUser={slotBookUser}></BookedSlotModal>
        </div>
    );
};

export default ManageSlots;