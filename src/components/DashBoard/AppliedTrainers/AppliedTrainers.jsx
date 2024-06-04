import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import { Card, Typography } from "@material-tailwind/react";
import EmptyData from "../../shared/EmptyData/EmptyData";
import { IoEyeOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import Swal from "sweetalert2";
import TrainerRejectModal from "../../Modals/TrainerRejectModal";


const AppliedTrainers = () => {

    const [appliedUser, setAppliedUser] = useState({});

    const [isOpenRej, setIsOpenRej] = useState(false)

    function openRej() {
        setIsOpenRej(true);
    }

    function closeRej() {
        setIsOpenRej(false)
    }

    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const TABLE_HEAD = ["", "Name", "Email", "Status", "Actions"];

    const { data: appliedTrainers = [], isLoading, refetch } = useQuery({
        queryKey: ['appliedTrainers'],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/appliedTrainers?email=${user?.email}`);
            return data;
        }
    })

    const { mutateAsync: acceptAsTrainer } = useMutation({
        mutationFn: async (trainer) => {
            const { data } = await axiosSecure.patch(`/updateAppliedTrainersAccept?email=${user?.email}`, trainer);
            return data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                toast.success("Applied changes successfully.");
                refetch();
            } else {
                toast.error("Something went wrong!");
            }
        }
    })


    const handleTrainerReq = async (trainer, action) => {

        if (action === 'accept') {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to make this user as a 'trainer'?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, sure"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await acceptAsTrainer(trainer, action)
                    } catch (error) {
                        toast.error(error.message);
                    }
                }
            });
        } else {
            setAppliedUser(trainer);
            openRej();
        }
    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if (appliedTrainers.length === 0) return <EmptyData title="No data in Applied Trainers!!"></EmptyData>

    return (
        <div className="flex justify-center items-center min-h-screen w-full ">
            <Card className="h-full w-full xl:w-3/4 mx-auto overflow-scroll lg:px-12">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-100 p-4"
                                >
                                    <Typography
                                        variant="paragraph"
                                        color="black"
                                        className="font-semibold leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {appliedTrainers.map((trainer, index) => {
                            const isLast = index === appliedTrainers.length - 1;
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
                                            color="green"
                                            className="font-normal"
                                        >
                                            {trainer?.status}
                                        </Typography>
                                    </td>
                                    <>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="black"
                                                className="font-normal text-white flex items-center gap-3"
                                            >
                                                <button className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-200"><IoEyeOutline className="text-xl" /></button>
                                                <button onClick={() => handleTrainerReq(trainer, "accept")} className="p-2 bg-green-300 rounded-full hover:bg-green-500 duration-200"><TiTick className="text-xl" /></button>
                                                <button onClick={() => handleTrainerReq(trainer, "reject")} className="p-2 bg-red-300 rounded-full hover:bg-red-500 duration-200"><RxCross2 className="text-xl" /></button>
                                            </Typography>
                                        </td>
                                    </>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
            <TrainerRejectModal isOpen={isOpenRej} close={closeRej} trainer={appliedUser} refetch={refetch}></TrainerRejectModal>
        </div>
    );
};

export default AppliedTrainers;