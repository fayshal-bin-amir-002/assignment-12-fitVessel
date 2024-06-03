import { useState } from "react";
import Container from "../../components/shared/Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Community = () => {

    const [blogs, setBlogs] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data = {}, isLoading, refetch } = useQuery({
        queryKey: ['communityBlogs', currentPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/community?page=${currentPage - 1}`);
            setBlogs(data.blogs);
            setCount(data.totalBlogs);
            return data;
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (voting) => {
            const { data } = await axiosSecure.patch(`/voteBlog`, voting);
            return data;
        },
        onSuccess: () => {
            refetch();
        }
    })

    const pages = [...Array(Math.ceil(parseInt(count) / 6)).keys()];

    const handleVote = async (vote, id) => {

        if(!user) return toast.error("Please login first!");
        
        const voting = { vote, id };
        try {
            await mutateAsync(voting)
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="py-8 md:py-12 lg:py-16 min-h-[60vh]">
            <Helmet>
                <title>Community Posts | Fit Vessel</title>
            </Helmet>
            <Container>
                <div className="flex flex-wrap">
                    {
                        blogs.map((blog) => <div key={blog._id} className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 2xl:w-1/4 flex flex-col">
                            <img src={blog.image} alt="Card img" className="object-cover object-center w-full h-48" />
                            <div className="flex flex-grow">
                                <div className="triangle"></div>
                                <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400 text">
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p
                                                className="inline-block text-xs font-bold capitalize border-b-2 border-[#DC5F00]">
                                                {blog.author}
                                            </p>
                                            <p>{blog.postDate}</p>
                                        </div>
                                        <h3
                                            className="block mb-4 text-2xl font-black leading-tight">
                                            {blog.title}
                                        </h3>
                                        <p className="mb-4">
                                            {blog.description.slice(0, 100)} . . . . . .
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <Link to={`/blog/${blog._id}`}
                                            className="max-w-max gap-1 flex items-center text-base font-black text-[#DC5F00] uppercase border-b-2 border-transparent hover:border-[#DC5F00]">Read More <ImArrowRight2 className="inline" />
                                        </Link>
                                        <div className="flex gap-2 justify-end">

                                            <button onClick={() => handleVote('like', blog._id)} className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                                </svg>
                                                <span>{blog.likes}</span>
                                            </button>

                                            <button onClick={() => handleVote('dislike', blog._id)} className="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border  rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                                </svg>
                                                <span>{blog.dislikes}</span>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <div className="flex justify-center mt-8 md:mt-12 lg:mt-16">
                    {
                        blogs && <ul className="inline-flex">
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

export default Community;