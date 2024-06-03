import { useLocation } from "react-router-dom";
import Container from "../../components/shared/Container/Container";
import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Payment = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { state } = useLocation();

    const bookingData = state.bookingData;

    const { mutateAsync } = useMutation({
        mutationFn: async (paymentData) => {
            const { data } = await axiosSecure.post(`/payment?email=${user?.email}`, paymentData);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success("Payment successful.");
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    const savePayment = async () => {
        try {
            await mutateAsync(bookingData)
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="py-8 md:py-12 lg:py-16 min-h-[60vh]">
            <Helmet>
                <title>Payment | Fit Vessel</title>
            </Helmet>
            <Container>
                <div className="flex justify-center items-center">
                    <div className="p-6 md:p-8 lg:p-10 bg-gray-100 rounded-lg shadow-md w-full lg:w-2/3 xl:w-1/2 flex flex-col gap-1 lg:gap-3">

                        <p><span className="text-lg font-medium">Your Name : </span> <span className="opacity-80">{bookingData.user.name}</span></p>
                        <p><span className="text-lg font-medium">Your Email : </span> <span className="opacity-80">{bookingData.user.email}</span></p>
                        <p><span className="text-lg font-medium">Your UID : </span> <span className="opacity-80">{bookingData.user.uid} $</span></p>

                        <div className="h-[1px] w-full bg-blue-gray-600"></div>

                        <p><span className="text-lg font-medium">Trainer Name :</span> <span className="opacity-80">{bookingData.trainer.name}</span></p>
                        <p><span className="text-lg font-medium">Trainer Email :</span> <span className="opacity-80">{bookingData.trainer.email}</span></p>
                        <p><span className="text-lg font-medium">Class :</span> <span className="opacity-80">{bookingData.class.name}</span></p>
                        <p><span className="text-lg font-medium">Day :</span> <span className="opacity-80">{bookingData.class.day}</span></p>
                        <p><span className="text-lg font-medium">Time :</span> <span className="opacity-80">{bookingData.class.time}</span></p>
                        <p><span className="text-lg font-medium">Duration :</span> <span className="opacity-80">{bookingData.class.duration} hr</span></p>

                        <div className="h-[1px] w-full bg-blue-gray-600"></div>

                        <p><span className="text-lg font-medium">Package :</span> <span className="opacity-80">{bookingData.package}</span></p>
                        <p><span className="text-lg font-medium">Price :</span> <span className="opacity-80">{bookingData.price} $</span></p>

                        <div onClick={savePayment} className="mt-6 text-right">
                            <Button type="submit" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                <span className="relative">Pay Now</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
{/* <BiLoaderCircle className=" animate-spin mx-auto text-lg" /> */ }
export default Payment;