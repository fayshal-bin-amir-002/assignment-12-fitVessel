import { useQuery } from "@tanstack/react-query";
import Container from "../../components/shared/Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import ClassCard from "./ClassCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import EmptyData from "../../components/shared/EmptyData/EmptyData";

const AllClasses = () => {

    const [allClasses, setAllClasses] = useState([]);
    const [search, setSearch] = useState('');
    const [totalclass, setTotalclass] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosPublic = useAxiosPublic();

    const { data = {}, isLoading } = useQuery({
        queryKey: ['allClasses', currentPage, search],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/classes?page=${currentPage - 1}&search=${search}`);
            setAllClasses(data.result);
            setTotalclass(data.totalclass);
            return data;
        }
    })
console.log(totalclass);
    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchText = form.search.value;
        setSearch(searchText);
        setCurrentPage(1);
    }

    const pages = [...Array(Math.ceil(parseInt(totalclass) / 6)).keys()];

    return (
        <div className="min-h-[60vh] py-8 md:py-8 lg:py-12">
            <Helmet>
                <title>All Classes | Fit Vessel</title>
            </Helmet>
            <Container>
                <div className="py-6 md:py-8 lg:py-12">
                    <form onSubmit={handleSearch} className="flex items-center max-w-lg ms-auto">
                        <input type="search" name="search" id="input-9" className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-[#DC5F00] focus:outline-none rounded shadow-sm" placeholder="Search class name" />
                        <button className="h-10 px-4 text-sm bg-[#DC5F00] border border-l-0 border-[#DC5F00] rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-[#DC5F00] hover:border-[#DC5F00] hover:bg-opacity-80 focus:outline-none">Search</button>
                    </form>
                </div>
                {
                    !isLoading && allClasses.length === 0 ? <div className="flex justify-center items-center h-[30vh]">
                        <p className="text-red-400 text-5xl">{`No class found by "${search}"`}</p>
                    </div> : isLoading ? <LoadingSpiner isBig={true}></LoadingSpiner> :
                        <>
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
                        </>
                }
            </Container>
        </div>
    );
};

export default AllClasses;