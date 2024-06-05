import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../../shared/LoadingSpiner/LoadingSpiner";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import EmptyData from "../../../shared/EmptyData/EmptyData";
import BookedTrainerModal from "../../../Modals/BookedTrainerModal";
import { Card, Typography } from "@material-tailwind/react";

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

    const TABLE_HEAD = ["", "Day", "Class", "Slot Name", "Slot Time", "Action"];

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <>
            {
                myBooking.length === 0 ? <EmptyData title={"No data available in Booked Trainer!"}></EmptyData> :
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
                                    {myBooking && myBooking.map((slot, index) => {
                                        const isLast = index === myBooking.length - 1;
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
                                                        {slot?.class?.day}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {slot?.class?.cName}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {slot?.class?.sName}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {slot?.class?.sTime} Hr
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <button onClick={() => open(slot.trainer, slot.package, slot.price, slot.transactionId)} className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-300 text-white "><IoEyeOutline className="text-xl" /></button>
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                        <BookedTrainerModal isOpen={isOpen} close={close} info={info}></BookedTrainerModal>
                    </div>
            }
        </>
    );
};

export default BookedTrainer;