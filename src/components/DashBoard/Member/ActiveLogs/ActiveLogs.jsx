import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import EmptyData from "../../../shared/EmptyData/EmptyData";
import { useState } from "react";
import ActiveLogModal from "../../../Modals/ActiveLogModal";

const ActiveLogs = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ['active-logs', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/active-logs/${user?.email}?email=${user?.email}`);
            return data;
        }
    })

    function open(msg) {
        setMessage(msg);
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if (data.length === 0) return <EmptyData title="No data in active logs!"></EmptyData>

    return (
        <>
            <div className="flex justify-center items-center min-h-screen">
                <table className=" w-[800px] overflow-x-auto border-collapse border border-blue-500 mx-auto">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data && data.map((trainer) => <tr key={trainer._id} className="bg-white border-b border-blue-500">
                                <td className="py-3 px-4">{trainer?.name}</td>
                                <td className="py-3 px-4">{trainer?.email}</td>
                                <td className={`${trainer?.status === 'pending' ? 'text-amber-500' : 'text-red-500'} py-3 px-4 capitalize`}>{trainer?.status}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => open(trainer?.feedback)} className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-300 text-white disabled:cursor-not-allowed disabled:bg-gray-500" disabled={trainer?.status === 'pending'} ><IoEyeOutline className="text-xl" /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                <ActiveLogModal isOpen={isOpen} close={close} message={message}></ActiveLogModal>
            </div>
        </>
    );
};

export default ActiveLogs;