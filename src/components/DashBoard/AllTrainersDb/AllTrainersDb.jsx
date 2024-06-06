import { Card, Typography } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllTrainersDb = () => {

    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const TABLE_HEAD = ["", "Name", "Email", "Status", "Action"];

    const { data: trainers = [], isLoading, refetch } = useQuery({
        queryKey: ['trainers-db'],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/trainers-db?email=${user?.email}`);
            return data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (email) => {
            const { data } = await axiosSecure.delete(`/trainer-delete/${email}?email=${user?.email}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount === 1) {
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    const handleDeleteTrainer = async (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete Trainer!"
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await mutateAsync(email);
                } catch (error) {
                    toast.error(error.message);
                }
            }
        });


    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="flex justify-center items-center min-h-[80vh] w-full ">
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
                        {trainers.map(({ name, email, status }, index) => {
                            const isLast = index === trainers.length - 1;
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
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {email}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="green"
                                            className="font-normal"
                                        >
                                            {status}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <button onClick={() => handleDeleteTrainer(email)} className="bg-red-200 text-white font-semibold px-2 py-1 rounded-full">Delete</button>
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default AllTrainersDb;