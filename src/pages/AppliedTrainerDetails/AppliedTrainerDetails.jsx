import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import TrainerRejectModal from "../../components/Modals/TrainerRejectModal";

const AppliedTrainerDetails = () => {

    const [isOpenRej, setIsOpenRej] = useState(false)

    const navigate = useNavigate();

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

    const { mutateAsync: acceptAsTrainer } = useMutation({
        mutationFn: async (trainer) => {
            const { data } = await axiosSecure.patch(`/updateAppliedTrainersAccept?email=${user?.email}`, trainer);
            return data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount === 1) {
                toast.success("Applied changes successfully.");
                navigate("/dashboard/all-trainers-db");
            } else {
                toast.error("Something went wrong!");
            }
        }
    })

    const handleTrainerReq = async (action) => {

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
                        await acceptAsTrainer(appliedTrainer)
                    } catch (error) {
                        toast.error(error.message);
                    }
                }
            });
        } else {
            openRej();
        }
    }

    function openRej() {
        setIsOpenRej(true);
    }

    function closeRej() {
        setIsOpenRej(false)
    }

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 md:p-8 lg:p-12 bg-gray-100 rounded-lg shadow-md w-full lg:w-10/12 2xl:w-3/4">
                <h3 className="text-3xl lg:text-4xl font-medium text-center border-b-2 border-gray-400 pb-4 mb-5">Applied Trainer Details</h3>
                <div className=" text-gray-600 space-y-2 lg:space-y-3">
                    <div className="flex justify-center mb-8 md:mb-10">
                        <img src={appliedTrainer?.image} alt="" className="w-full md:w-1/3 h-[250px] object-contain" />
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
                <div className="py-5 flex gap-4 justify-end">
                    <button onClick={() => navigate(-1)}
                        className="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                            </path>
                        </svg>
                        <span className="ml-1 font-bold text-lg">Go Back</span>
                    </button>
                    <button onClick={() => handleTrainerReq("accept")} className="px-3 py-1 bg-green-300 text-white rounded-full hover:bg-green-500 duration-200"><TiTick className="text-lg inline" /> Accept</button>
                    <button onClick={() => handleTrainerReq("reject")} className="px-3 py-1 text-white bg-red-300 rounded-full hover:bg-red-500 duration-200"><RxCross2 className="text-lg inline" /> Reject</button>
                </div>
            </div>
            <TrainerRejectModal isOpen={isOpenRej} close={closeRej} trainer={appliedTrainer}></TrainerRejectModal>
        </div>
    );
};

export default AppliedTrainerDetails;