import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import ClassCard from "./ClassCard";
import { useState } from "react";

const AllClasses = () => {

    const [allClasses, setAllClasses] = useState([]);
    const [totalclass, setTotalclass] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosPublic = useAxiosPublic();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['allClasses', currentPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/classes?page=${currentPage - 1}`);
            setAllClasses(data.result);
            setTotalclass(data.totalclass)
            return data;
        }
    })

    const pages = [...Array(Math.ceil(parseInt(totalclass) / 6)).keys()];

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="min-h-[60vh] py-8 md:py-8 lg:py-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {
                        allClasses.map((item) => <ClassCard key={item._id} item={item}></ClassCard>)
                    }
                </div>
                <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
                    {
                        allClasses && <ul className="inline-flex">
                            <li>
                                <button onClick={() => {
                                    setCurrentPage(currentPage - 1)
                                }} className="h-8 px-5 text-[#DC5F00] font-bold transition-colors duration-150 bg-white border border-gray-500 rounded-s-lg focus:shadow-outline hover:bg-indigo-100 disabled:cursor-not-allowed" disabled={currentPage === 1}>Prev</button>
                            </li>
                            {
                                pages.map((page) => <li key={page}>
                                    <button onClick={() => {
                                        setCurrentPage(page + 1)
                                    }} className={`${currentPage === page + 1 ? 'bg-[#DC5F00] text-white' : ' bg-white'} h-8 px-5 text-[#DC5F00] font-bold transition-colors duration-150 border border-r-0 border-gray-500 focus:shadow-outline hover:bg-indigo-100`}>{page + 1}</button>
                                </li>)
                            }
                            <li>
                                <button onClick={() => {
                                    setCurrentPage(currentPage + 1)
                                }} className="h-8 px-5 text-[#DC5F00] font-bold transition-colors duration-150 bg-white border border-gray-500 rounded-r-lg focus:shadow-outline hover:bg-indigo-100 disabled:cursor-not-allowed" disabled={currentPage === pages.length}>Next</button>
                            </li>
                        </ul>
                    }
                </div>
            </Container>
        </div>
    );
};

export default AllClasses;