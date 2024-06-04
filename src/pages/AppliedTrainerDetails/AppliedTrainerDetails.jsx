import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";

const AppliedTrainerDetails = () => {

    const { id } = useParams();

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: appliedTrainer = {}, isLoading } = useQuery({
        queryKey: ['applied-trainer-details', id],
        enabled: !!id,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`applied-trainer-details/${id}?email=${user?.email}`);
            return data;
        }
    })

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 md:p-8 lg:p-12 bg-gray-100 rounded-lg shadow-md w-full lg:w-10/12 2xl:w-3/4">
                <h3 className="text-3xl lg:text-4xl font-medium text-center border-b-2 border-gray-400 pb-4 mb-5">Applied Trainer Details</h3>
                <div className=" text-gray-600 space-y-2 lg:space-y-3">
                    <div className="flex justify-center mb-8 md:mb-10">
                        <img src={appliedTrainer?.image} alt="" className="w-full md:w-1/3 h-[250px] object-cover" />
                    </div>
                    <p><span className="font-semibold">Name : </span> {appliedTrainer?.name}</p>
                    <p><span className="font-semibold">Email : </span> {appliedTrainer?.email}</p>
                    <p><span className="font-semibold">Experience : </span> {appliedTrainer?.experience} Year</p>
                    <p><span className="font-semibold">Skills : </span>
                        {
                            appliedTrainer?.skills && appliedTrainer?.skills?.map((skill, i) => <span className="pr-1 text-green-400" key={i}>{skill.value} </span>)
                        }
                    </p>
                    <p><span className="font-semibold">Skills : </span>
                        {
                            appliedTrainer?.availableDays && appliedTrainer?.availableDays?.map((day, i) => <span className="pr-1 text-amber-600" key={i}>{day.value} </span>)
                        }
                    </p>
                    <p><span className="font-semibold">Available Time : </span> {appliedTrainer?.availableTime}</p>
                    <p><span className="font-semibold">Class Time : </span> {appliedTrainer?.classDuration} Hour</p>
                    <p><span className="font-semibold">Biography : </span> {appliedTrainer?.biography}</p>
                    <p><span className="font-semibold">Status : </span> <span className="text-red-500 capitalize">{appliedTrainer?.status}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AppliedTrainerDetails;