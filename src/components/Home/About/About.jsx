import { Link } from "react-router-dom";
import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";

const About = () => {
    return (
        <Container>
            <section className="bg-gray-50 rounded-lg">
                <div className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12 lg:gap-20">
                        <div>
                            <SectionHeader title="About Us" description=""></SectionHeader>
                            <p className="opacity-70">Welcome to FitVessel, your ultimate fitness companion. At FitVessel, we are dedicated to helping you achieve your health and fitness goals with ease and precision. Our platform offers comprehensive activity tracking, personalized fitness insights, and tailored workout plans designed for all fitness levels.We believe that fitness is a journey, and we are here to support you every step of the way. Whether you’re just starting out or looking to take your performance to the next level, FitVessel provides the tools you need to stay motivated and informed. Our user-friendly interface ensures a seamless experience, making it easy to monitor your progress and stay on track.Join our vibrant community of fitness enthusiasts, participate in challenges, and share your journey. At FitVessel, we are committed to empowering you to live a healthier, happier life. Start your fitness journey with us today!</p>
                            <div className="mt-8">
                                <Link to="" className="text-blue-500 hover:text-blue-600 font-medium">Learn more about us
                                    <span className="ml-2">&#8594;</span></Link>
                            </div>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <img src="https://img.freepik.com/free-photo/group-young-people-training-gym-indoors-maintaining-sportive-lifestyle_155003-45877.jpg?t=st=1717235733~exp=1717239333~hmac=3c1b96af249fac234f32ef3abbc72b5f2e64f29729f762db2302504dac161776&w=1380" alt="About Us Image" className="object-cover rounded-lg shadow-md" />
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default About;