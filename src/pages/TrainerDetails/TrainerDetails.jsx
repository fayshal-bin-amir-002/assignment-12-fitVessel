import { Link, useLoaderData } from "react-router-dom";
import Container from "../../components/shared/Container/Container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpiner from "../../components/shared/LoadingSpiner/LoadingSpiner";

const TrainerDetails = () => {

    const axiosPublic = useAxiosPublic();

    const trainer = useLoaderData() || {};

    const { data: slots = [], isLoading } = useQuery({
        queryKey: ['slots', trainer?._id],
        enabled: !!trainer,
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/trainer-slots/${trainer?._id}`)
            return data;
        }
    })

    if (isLoading) return <LoadingSpiner isBig={true}></LoadingSpiner>

    return (
        <div className="min-h-[60vh] mb-12 md:mb-16 lg:mb-24">
            <Helmet>
                <title>Trainer Details | Fit Vessel</title>
            </Helmet>
            <Container>
                <div id="about" className="relative bg-white my-16">
                    <div className="max-w-9xl mx-auto">
                        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-xl lg:w-full lg:pb-28 xl:pb-32">
                            <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                                fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <polygon points="50,0 100,0 50,100 0,100"></polygon>
                            </svg>

                            <div className="pt-1"></div>

                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="text-left">
                                    <SectionHeader title={"About Trainer"} description={""}></SectionHeader>
                                    <p className="text-lg font-medium mb-2">Name : {trainer?.name}</p>
                                    <p className="font-medium mb-2">Experience : {trainer?.experience} year</p>
                                    <div>
                                        <p className="font-medium">Skills : </p>
                                        {
                                            trainer && trainer?.skills.map((skill, i) => <p className="text-sm text-green-400 font-light" key={i}>{skill.value}</p>)
                                        }
                                    </div>
                                    <p className="mt-3 opacity-80">Biography : {trainer.biography}</p>
                                    <div className="w-full flex gap-4 md:gap-8 justify-start items-center pt-8">
                                        <Link>
                                            <div aria-label="Github">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-github">
                                                    <path
                                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                                    </path>
                                                </svg>
                                            </div>
                                        </Link>
                                        <Link>
                                            <div aria-label="Twitter">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-twitter">
                                                    <path
                                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </Link>
                                        <Link>
                                            <div aria-label="Instagram">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src={trainer?.image} alt="" />
                    </div>
                </div>
                <div className="overflow-x-auto mt-8 md:mt-12 lg:mt-16">
                    {
                        slots.length === 0 ? <p className="text-center py-8 text-4xl text-red-400">No Available slot!</p> :
                            slots.map((slot, i) => <table key={i} className=" w-[800px] overflow-x-auto border-collapse border border-blue-500 mx-auto">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className="py-3 px-4 text-left">Day</th>
                                        <th className="py-3 px-4 text-left">Slot Name</th>
                                        <th className="py-3 px-4 text-left">Slot Time</th>
                                        <th className="py-3 px-4 text-left">Classes</th>
                                        <th className="py-3 px-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        slot.classDays.map((day, i) => <tr key={i} className="bg-white border-b border-blue-500">
                                            <td className="py-3 px-4">{day.value}</td>
                                            <td className="py-3 px-4">{slot.slotName}</td>
                                            <td className="py-3 px-4">{slot.slotTime} hr</td>
                                            <td className="py-3 px-4">
                                                {
                                                    slot.classesName.map((c, i) => <span className="text-xs mr-2 border border-red-100 font-medium rounded text-green-500" key={i}>{c.value}</span>)
                                                }
                                            </td>
                                            <td className="py-3 px-4 min-w-[120px]">
                                                <Link
                                                    to={`/trainer-booking/${trainer._id}`}
                                                    state={{ 'day': day.value, 'sTime': slot.slotTime, 'sName': slot.slotName, 'slotId': slot._id, 'class_names': slot.classesName }}
                                                    className="min-w-max px-3 py-1 bg-green-200 rounded-full text-sm">Book <MdOutlineKeyboardDoubleArrowRight className="inline" /></Link>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>)
                    }
                </div>
                {/* call on action section */}
                <section className="w-full flex bg-gray-50 mt-12 md:mt-16 lg:mt-24">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                        <div className="text-center space-y-5">
                            <h2 className="text-base font-semibold text-pink-400 tracking-wide uppercase">Get started now</h2>
                            <div className="inline-flex items-end justify-center w-full text-center mx-auto">
                                <img src="https://randomuser.me/api/portraits/men/47.jpg"
                                    className="absolute transform translate-x-24 ml-6 rounded-full object-cover w-12 h-12 md:w-16 md:h-16 border-4 border-white" />
                                <img src="https://randomuser.me/api/portraits/men/49.jpg"
                                    className="absolute transform -translate-x-24 -ml-6 rounded-full object-cover w-12 h-12 md:w-16 md:h-16 border-4 border-white" />
                                <img src="https://bryanuniversity.edu/wp-content/uploads/personal-train-undergrad-cert@2x-scaled.jpg"
                                    className="absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 object-cover md:h-20 border-4 border-white" />
                                <img src="https://freakinfitness.com/wp-content/uploads/2023/07/Different-Types-of-Personal-Fitness-Trainers-And-Their-Average-Costs_--1024x538.jpg"
                                    className="absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 object-cover md:h-20 border-4 border-white" />
                                <img src="https://hips.hearstapps.com/hmg-prod/images/mh-trainer-2-1533577086.png"
                                    className="rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white object-cover relative" />
                            </div>
                            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Discover
                                your
                                skills
                                <span className="px-2 py-1 relative inline-block">
                                    <svg className="stroke-current bottom-0 absolute text-rose-300 -translate-x-2" viewBox="0 0 410 18"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none"
                                            fillRule="evenodd" strokeLinecap="round"></path>
                                    </svg>
                                    <span className="relative">with us</span>
                                </span>
                            </p>

                            <p className="max-w-3xl mt-5 mx-auto text-xl text-gray-500">
                                Join with our experienced and dedicated FitVessel Team
                            </p>

                            <div className="flex items-center justify-center">
                                <div style={{ transform: "none" }}>
                                    <Link to="/trainer-request">
                                        <button
                                            className="relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"><span
                                                className="absolute inset-0 overflow-hidden rounded-xl"><span
                                                    className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                                                </span>
                                            </span>
                                            <div
                                                className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10 ">
                                                <span>Be A Trainer</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                    data-slot="icon" className="w-6 h-6">
                                                    <path fillRule="evenodd"
                                                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                        clipRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <span
                                                className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </Container>
        </div>
    );
};

export default TrainerDetails;