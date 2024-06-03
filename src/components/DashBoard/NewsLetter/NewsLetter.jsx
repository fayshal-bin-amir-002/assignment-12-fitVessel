import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";


const NewsLetter = () => {

    const axiosSecure = useAxiosSecure();

    const { user, loading } = useAuth();

    const TABLE_HEAD = ["", "Name", "Email"];

    const { data : subscribers = [], isLoading } = useQuery({
        queryKey: ['newsletter'],
        enabled: !loading && !!user,
        queryFn: async() => {
            const { data } = await axiosSecure.get(`/newsletters?email=${user?.email}`);
            return data;
        }
    })

    if(loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="flex justify-center items-center min-h-screen w-full ">
            <Card className="h-full w-full md:w-3/4 lg:w-1/2 mx-auto overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map(({ name, email }, index) => {
                            const isLast = index === subscribers.length - 1;
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
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default NewsLetter;