import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import "./FeaturedCard.css"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";
import FeaturedClassCard from "./FeaturedClassCard";

const FeaturedClasses = () => {

    const axiosPublic = useAxiosPublic();

    const { data: featuredClasses = [], isLoading } = useQuery({
        queryKey: ['featuredClasses'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/featured-classes");
            return data;
        }
    })

    return (
        <div className="my-12 md:my-16 lg:my-20 xl:my-24">
            <Container>
                <SectionHeader title="Featured Classes" description="Discover a variety of engaging fitness classes at FitVessel. From yoga to HIIT, our expert-led sessions cater to all levels and keep you motivated."></SectionHeader>
                {
                    isLoading ? <LoadingSpiner></LoadingSpiner> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 justify-items-center">
                            {
                                featuredClasses.map((item) => <FeaturedClassCard key={item._id} item={item}></FeaturedClassCard>)
                            }
                        </div>
                }
            </Container>
        </div>
    );
};

export default FeaturedClasses;