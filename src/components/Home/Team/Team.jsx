import { useQuery } from "@tanstack/react-query";
import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import TeamCard from "./TeamCard";

const Team = () => {

    const axiosPublic = useAxiosPublic();

    const { data: teams = [], isLoading } = useQuery({
        queryKey: ['teams'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/teams");
            return data;
        }
    })

    return (
        <div className="my-12 md:my-16 lg:my-20 xl:my-24">
            <Container>
                <SectionHeader title="Meet Our Expert Team" description={"Our team of dedicated fitness professionals is here to guide you on your fitness journey. With diverse expertise in personal training, nutrition, and wellness, we're committed to helping you achieve your health and fitness goals."}></SectionHeader>
                {
                    isLoading ? <LoadingSpiner></LoadingSpiner> :
                        <div className="grid gap-6 lg:gap-10 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">

                            {
                                teams.map((team) => <TeamCard key={team._id} team={team}></TeamCard>)
                            }

                        </div>
                }
            </Container>
        </div>
    );
};

export default Team;