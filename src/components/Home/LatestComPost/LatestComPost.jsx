import { Link } from "react-router-dom";
import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { ImArrowRight2 } from "react-icons/im";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpiner from "../../shared/LoadingSpiner/LoadingSpiner";


const LatestComPost = () => {

    const axiosPublic = useAxiosPublic();

    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/blogs");
            return data;
        }
    })

    return (
        <div className="my-12 md:my-16 lg:my-20 xl:my-24">
            <Container>
                <SectionHeader title="Latest Community Posts" description="Stay updated with the newest discussions and topics in our community. Join conversations, share insights, and connect with fellow fitness enthusiasts!"></SectionHeader>
                <section className="flex flex-col justify-center max-w-8xl mx-auto ">
                    {isLoading ? <LoadingSpiner></LoadingSpiner> :
                        <div className="flex flex-wrap">
                            {
                                blogs.map((blog) => <div key={blog._id} className="w-full max-w-full mb-8 sm:w-1/2 lg:w-1/3 2xl:w-1/4 flex flex-col">
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
                                            <div>
                                                <Link to={`/blog/${blog._id}`}
                                                    className="max-w-max gap-1 flex items-center pb-1 mt-2 text-base font-black text-[#DC5F00] uppercase border-b-2 border-transparent hover:border-[#DC5F00]">Read More <ImArrowRight2 className="inline" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>}
                </section>
            </Container>
        </div>
    );
};

export default LatestComPost;