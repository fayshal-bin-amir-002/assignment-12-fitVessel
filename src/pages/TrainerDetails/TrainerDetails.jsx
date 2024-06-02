import { Link, useLoaderData } from "react-router-dom";
import Container from "../../components/shared/Container/Container";
import SectionHeader from "../../components/shared/SectionHeader/SectionHeader";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const TrainerDetails = () => {

    const trainer = useLoaderData();

    return (
        <div className="min-h-[60vh] mb-12 md:mb-16 lg:mb-24">
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
                                            trainer?.skills.map((skill, i) => <p className="text-sm font-light" key={i}>{skill}</p>)
                                        }
                                    </div>
                                    <p className="mt-3 opacity-80">Biography : {trainer.biography}</p>
                                    <div className="w-full flex gap-4 md:gap-8 justify-start items-center pt-8">
                                        <a href="#">
                                            <div aria-label="Github">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-github">
                                                    <path
                                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                                    </path>
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <div aria-label="Twitter">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-twitter">
                                                    <path
                                                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <div aria-label="Instagram">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-instagram">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src={trainer?.image} alt="" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className=" w-[800px] overflow-x-auto border-collapse border border-blue-500  mt-16 mx-auto">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-3 px-4 text-left">Day</th>
                                <th className="py-3 px-4 text-left">Time</th>
                                <th className="py-3 px-4 text-left">Duration</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trainer.availableDays.map((day, i) => <tr key={i} className="bg-white border-b border-blue-500">
                                    <td className="py-3 px-4">{day.label}</td>
                                    <td className="py-3 px-4">{trainer.availableTime}</td>
                                    <td className="py-3 px-4">{trainer.classDuration} hr</td>
                                    <td className="py-3 px-4">
                                        <Link className="px-3 py-1 bg-green-200 rounded-full text-sm">Book <MdOutlineKeyboardDoubleArrowRight className="inline" /></Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
};

export default TrainerDetails;