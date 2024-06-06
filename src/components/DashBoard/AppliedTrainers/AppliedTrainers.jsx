import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import { Card, Typography } from "@material-tailwind/react";
import EmptyData from "../../shared/EmptyData/EmptyData";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const AppliedTrainers = () => {

    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const TABLE_HEAD = ["", "Name", "Email", "Status", "Actions"];

    const { data: appliedTrainers = [], isLoading } = useQuery({
        queryKey: ['appliedTrainers'],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/appliedTrainers?email=${user?.email}`);
            return data;
        }
    })


    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    if (appliedTrainers.length === 0) return <EmptyData title="No data in Applied Trainers!!"></EmptyData>

    return (
        <div className="flex justify-center items-center min-h-[70vh] w-full ">
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
                                                <Link to={`applied-trainer-details/${trainer._id}`}>
                                                    <button className="p-2 bg-gray-500 rounded-full hover:bg-gray-700 duration-200"><IoEyeOutline className="text-xl" /></button>
                                                </Link>
                                            </Typography>
                                        </td>
                                    </>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default AppliedTrainers;