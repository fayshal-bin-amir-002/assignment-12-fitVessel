import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import EmptyData from "../../../shared/EmptyData/EmptyData";
import BookedTrainerModal from "../../../Modals/BookedTrainerModal";

const BookedTrainer = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [info, setInfo] = useState({});

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: myBooking = [], isLoading } = useQuery({
        queryKey: ['booked-trainer', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-booking/${user?.email}?email=${user?.email}`);
            return data;
        }
    })

    function open(trainer, pkg, price, trxId) {
        const info = {
            trainer, pkg, price, trxId
        }
        setInfo(info);
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                {
                    myBooking.length === 0 ? <EmptyData title={"No data available in Booked Trainer!"}></EmptyData> :
                        <table className=" w-[800px] overflow-x-auto border-collapse border border-blue-500 mx-auto">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-3 px-4 text-left">Day</th>
                                    <th className="py-3 px-4 text-left">Class</th>
                                    <th className="py-3 px-4 text-left">Slot Name</th>
                                    <th className="py-3 px-4 text-left">Slot Time</th>
                                    <th className="py-3 px-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myBooking && myBooking.map((slot, i) => <tr key={i} className="bg-white border-b border-blue-500">
                                        <td className="py-3 px-4">{slot.class.day}</td>
                                        <td className="py-3 px-4">{slot.class.cName}</td>
                                        <td className="py-3 px-4">{slot.class.sName}</td>
                                        <td className="py-3 px-4">{slot.class.sTime} hr</td>
                                        <td className="py-3 px-4">
                                            <button onClick={() => open(slot.trainer, slot.package, slot.price, slot.transactionId)} className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-300 text-white "><IoEyeOutline className="text-xl" /></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                }
                <BookedTrainerModal isOpen={isOpen} close={close} info={info}></BookedTrainerModal>
            </div>
        </>
    );
};

export default BookedTrainer;