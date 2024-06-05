import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";


const Balance = () => {

    const [forceLoading, setForceLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setForceLoading(false);
        }, 2500);
    }, []);

    const { user, loading } = useAuth();

    const axiosSecure = useAxiosSecure();

    const TABLE_HEAD = ["", "Member Email", "Trx Id", "Amount"];

    const { data: balanceData = {}, isLoading } = useQuery({
        queryKey: ['balance', user?.email],
        enabled: !loading && !!user,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/balance?email=${user?.email}`);
            return data;
        }
    })

    const options = {
        title: "Paid members / NewsLetter Subscribers",
    };

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="bg-gray-50 py-8 md:py-12 lg:py-16 w-full min-h-screen">
            <div className="w-[300px] mx-auto mb-6 lg:mb-8">
                <div className="rounded-lg overflow-hidden shadow-md bg-white">
                    <div className="px-6 py-8 flex justify-between flex-col gap-8">
                        <h3 className="text-5xl font-bold mb-4 text-yellow-600">Balance</h3>
                        <h2 className="text-3xl font-bold mb-8 text-green-600">Total : {balanceData.info[0].totalBalance} $</h2>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-10/12 2xl:w-3/4 mx-auto">
                <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-300 p-4"
                                    >
                                        <Typography
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
                            {balanceData.info[0].transactions.slice(0, 6).map(({ email, transactionId, price }, index) => {
                                const isLast = index === balanceData.info[0].transactions.length - 1;
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
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {transactionId}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {price}$
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>

            {
                forceLoading ? <LoadingSpiner></LoadingSpiner> :
                    <div className="py-8 md:py-10 lg:py-12">
                        <Chart
                            chartType="PieChart"
                            data={balanceData?.chartData}
                            options={options}
                            width={"100%"}
                            height={"400px"}
                            className="bg-transparent"
                        />

                    </div>
            }
        </div>
    );
};

export default Balance;