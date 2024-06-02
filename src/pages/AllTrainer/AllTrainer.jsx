import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container/Container";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TrainerProfileCard from "./TrainerProfileCard";

const AllTrainer = () => {

    const axiosPublic = useAxiosPublic();

    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/trainers");
            return data;
        }
    })

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className='min-h-[60vh] py-14 md:py-20 lg:py-28'>
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {
                        trainers.map((trainer) => <TrainerProfileCard key={trainer._id} trainer={trainer}></TrainerProfileCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default AllTrainer;