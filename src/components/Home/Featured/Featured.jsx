import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";

const Featured = () => {
    return (
        <Container>
            <div className="my-12 md:my-16 lg:my-20 xl:my-24">
                <SectionHeader title="Prime Features" description="Explore the standout capabilities of FitVessel. Our advanced tools and intuitive interface support your journey to better health and fitness."></SectionHeader>

                <div className="flex flex-col gap-5 md:gap-7 lg:gap-8 xl:flex-row items-center">
                    <div className="mr-0 md:mr-8 mb-6 md:mb-0">
                        <img className="w-full mx-auto rounded-lg shadow-md" src="https://ruckscience.com/wp-content/uploads/2022/07/Anaerobic-Fitness-featured-image.jpg" alt="can_help_banner" />
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-[#DC5F00] border-t-0 border-l-0 rounded-br-xl shadow-sm hover:shadow-[#DC5F00] duration-200">
                                <div className="size-24 mb-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPsAVapcN42VFCSWf1QmxqYQspMvjx89p35Q&s" alt="" className="rounded" />
                                </div>
                                <h3 className="text-2xl font-bold text-md mb-3">Comprehensive Activity Tracking</h3>
                                <p className="text-sm opacity-60">Monitor your workouts, steps, and activities with precision. FitVessel’s advanced tracking helps you stay on top of your fitness game.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-[#DC5F00] border-t-0 border-l-0 rounded-br-xl shadow-sm hover:shadow-[#DC5F00] duration-200">
                                <div className="size-24 mb-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSg1198kHKzrrZLkP24J-ENJDtJNT6amfeLw&s" alt="" className="rounded" />
                                </div>
                                <h3 className="text-2xl font-bold text-md mb-3">Personalized Fitness Insights</h3>
                                <p className="text-sm opacity-60">Get tailored insights and recommendations based on your activity data. FitVessel helps you understand your progress and optimize your routine.</p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-[#DC5F00] border-t-0 border-l-0 rounded-br-xl shadow-sm hover:shadow-[#DC5F00] duration-200">
                                <div className="size-24 mb-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-WpPFRfBIwsm7SY_A5vMXL0bMFopSauPcwA&s" alt="" className="rounded" />
                                </div>
                                <h3 className="text-2xl font-bold text-md mb-3">Customizable Workouts & Plans</h3>
                                <p className="text-sm opacity-60">Access a variety of workouts and fitness plans tailored to your goals. FitVessel offers customizable routines for all fitness levels.</p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-[#DC5F00] border-t-0 border-l-0 rounded-br-xl shadow-sm hover:shadow-[#DC5F00] duration-200">
                                <div className="size-24 mb-3">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnacbvrApjqufGu3UEoLSIMckQun35eWEvg&s" alt="" className="rounded" />
                                </div>
                                <h3 className="text-2xl font-bold text-md mb-3">User-Friendly Interface</h3>
                                <p className="text-sm opacity-60">Enjoy a seamless and intuitive user experience. FitVessel’s design makes it easy to navigate and use all the powerful features.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Featured;