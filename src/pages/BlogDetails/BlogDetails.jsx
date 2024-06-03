import { useLoaderData } from "react-router-dom";
import Container from "../../components/shared/Container/Container";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {

    const blog = useLoaderData();

    return (
        <Container>
            <Helmet>
                <title>Blog | Fit Vessel</title>
            </Helmet>
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
                <div className="bg-cover bg-center text-center overflow-hidden"
                    style={{ minHeight: '500px', backgroundImage: `url(${blog.image})` }}
                    title="Woman holding a mug">
                </div>
                <div className="max-w-3xl mx-auto">
                    <div
                        className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                        <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
                            <h1 className="text-gray-900 font-bold text-3xl mb-2">{blog.title}</h1>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-gray-900 text-sm font-medium">Written By :
                                    <span> {blog.author}</span>
                                </p>
                                <span className="bg-[#DC5F00] px-2 py-0.5 font-semibold text-sm rounded-sm text-white uppercase">{blog.role}</span>
                            </div>

                            <p className="text-gray-900 text-sm font-medium pt-1">
                                {blog.postDate}
                            </p>

                            <div className="w-full h-[2px] bg-black my-4"></div>

                            <p className="text-base leading-8 my-5 opacity-80">
                                {blog.description}
                            </p>

                            <div className="w-full h-[2px] bg-black my-4"></div>

                            <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
                                {
                                    blog.tags.map((tag, i) => <span key={i} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">#{tag}</span>)
                                }
                            </div>

                            <div className="flex gap-2 justify-end mt-6">

                                <button className="py-1.5 px-3 hover:text-green-600 hover:scale-105 hover:shadow text-center border rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"></path>
                                    </svg>
                                    <span>{blog.likes}</span>
                                </button>

                                <button className="py-1.5 px-3 hover:text-red-600 hover:scale-105 hover:shadow text-center border  rounded-md border-gray-400 h-8 text-sm flex items-center gap-1 lg:gap-2">
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"></path>
                                    </svg>
                                    <span>{blog.dislikes}</span>
                                </button>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BlogDetails;