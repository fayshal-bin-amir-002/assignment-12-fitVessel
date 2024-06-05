import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import EmptyData from "../../../shared/EmptyData/EmptyData";
import { useState } from "react";
import ActiveLogModal from "../../../Modals/ActiveLogModal";
import { Card, Typography } from "@material-tailwind/react";

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

    const TABLE_HEAD = ["", "Name", "Email", "Status", "Actions"];

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if (data.length === 0) return <EmptyData title="No data in active logs!"></EmptyData>

    return (
        <>
            <div className="flex justify-center items-center min-h-screen w-full ">
                <Card className="h-full w-full md:w-3/4 lg:w-1/2 mx-auto overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-100 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="black"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((trainer, index) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {trainer?.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {trainer?.email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className={`${trainer?.status === 'pending' ? 'text-amber-500' : 'text-red-500'} py-3 px-4 capitalize`}
                                            >
                                                {trainer?.status}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                            >
                                                <button onClick={() => open(trainer?.feedback)} className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-300 text-white disabled:cursor-not-allowed disabled:bg-gray-500" disabled={trainer?.status === 'pending'} ><IoEyeOutline className="text-xl" /></button>
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
                <ActiveLogModal isOpen={isOpen} close={close} message={message}></ActiveLogModal>
            </div>
        </>
    );
};

export default ActiveLogs;