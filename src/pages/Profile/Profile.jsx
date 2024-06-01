import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useState } from "react";
import UpdateProfileModal from "../../components/Modals/UpdateProfileModal";

const Profile = () => {

    const { user, loading } = useAuth();

    const { data: role, isLoading, refetch } = useRole();

    const [isOpen, setIsOpen] = useState(false)

    const mili = parseInt(user?.metadata?.lastLoginAt);
    const date = new Date(mili).toLocaleDateString();

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    if (loading || isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div>
            <section className="w-full overflow-hidden dark:bg-gray-900 px-4">
                <div className="flex flex-col">

                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="User Cover"
                        className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" />


                    <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
                        <img src={user?.photoURL} alt="User Profile"
                            className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem] break-words" />


                        <h1
                            className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white ps-2 lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
                            {user?.displayName}</h1>

                    </div>

                    <div
                        className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                            <div className="w-full flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                                <div className="w-full lg:w-1/2">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Name</dt>
                                            <dd className="text-lg font-semibold">{user?.displayName}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                                            <dd className="text-lg font-semibold">{user?.email}</dd>
                                        </div>
                                        <div className="flex flex-col py-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Role</dt>
                                            <dd className="text-lg capitalize font-semibold">{role}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <div className="w-full lg:w-1/2">
                                    <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                                        <div className="flex flex-col pb-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">UID</dt>
                                            <dd className="text-lg font-semibold">{user?.uid}</dd>
                                        </div>

                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Photo URL</dt>
                                            <dd className="text-lg font-semibold overflow-hidden break-all break-words">{user?.photoURL}</dd>
                                        </div>
                                        <div className="flex flex-col pt-3">
                                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Login</dt>
                                            <dd className="text-lg font-semibold">{date}</dd>
                                        </div>
                                        <div className="pt-12 text-right">
                                            <button onClick={() => open()} className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
                                                <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500">Update Profile</span>
                                                <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                                                <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
                                            </button>
                                            <UpdateProfileModal user={user} isOpen={isOpen} close={close} refetch={refetch}></UpdateProfileModal>
                                        </div>
                                    </dl>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;