import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/shared/Container/Container";
import { useState } from "react";
import { Button, Option, Select } from "@material-tailwind/react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const TrainerBooking = () => {

    const { user } = useAuth();

    const [plan, setPlan] = useState('');
    const [className, setClassName] = useState('');

    const trainer = useLoaderData();

    const { state } = useLocation();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!plan) return toast.error("Please select a plan!");
        if (!className) return toast.error("Please select a class!");

        let price = 0;

        if(plan === 'Basic') price = 10;
        if(plan === 'Standard') price = 50;
        if(plan === 'Premium') price = 100;

        const bookingData = {
            class: {
                name: className,
                day: state.day.value,
                time: state.availableTime,
                duration: state.duration
            },
            package: plan,
            price: price,
            trainer: {
                name: trainer.name,
                id: trainer._id,
                email: trainer.email
            },
            user: {
                name: user?.displayName,
                email: user?.email,
                uid: user?.uid
            }
        }

        navigate("/payment", {state: {bookingData}});

    }

    return (
        <div className="py-8 md:py-12 lg:py-16">
            <Helmet>
                <title>Trainer Booking | Fit Vessel</title>
            </Helmet>
            <Container>
                <div>
                    <section>
                        <div>
                            <div className="mx-auto max-w-3xl text-center pb-6 md:pb-8 lg:pb-10 ">
                                <h2 className="text-3xl font-bold sm:text-4xl mb-4">Pricing Plans</h2>
                                <p className="text-xl">Choose a plan that best suits your needs.</p>
                            </div>
                            <div className="grid gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                <div
                                    className={`${plan === 'Basic' ? 'bg-green-50' : ''} flex flex-col p-4 mx-auto max-w-md text-center rounded-box shadow-xl xl:p-6  border border-base-300 shadow-primary/10 border-primary/10 transition hover:border-primary-focus/20 hover:shadow-primary-focus/20`}>
                                    <h3 className="text-2xl font-semibold">Basic Membership</h3>
                                    <div className="flex justify-center items-baseline my-5 lg:my-7">
                                        <span className="mr-2 text-5xl font-extrabold">$10</span>
                                        <span className="">/month</span>
                                    </div>
                                    <ul role="list" className="mb-8 space-y-4 text-left">
                                        <li className="flex items-center space-x-3">

                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>

                                            <span className="text-base-content/80">Access to gym facilities during regular operating hours.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Use of cardio and strength training equipment.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Access to locker rooms and showers.</span>
                                        </li>
                                    </ul>
                                    <div>
                                        <button onClick={() => setPlan("Basic")} className="w-full font-bold gap-2 shadow uppercase p-2 bg-teal-500 text-white">Select</button>
                                    </div>
                                </div>
                                <div
                                    className={`${plan === 'Standard' ? 'bg-green-50' : ''} flex flex-col p-4 mx-auto max-w-md text-center rounded-box shadow-xl xl:p-6  border border-base-300 shadow-primary/10 border-primary/10 transition hover:border-primary-focus/20 hover:shadow-primary-focus/20`}>
                                    <h3 className="text-2xl font-semibold">Standard Membership</h3>
                                    <div className="flex justify-center items-baseline my-5 lg:my-7">
                                        <span className="mr-2 text-5xl font-extrabold">$50</span>
                                        <span className="">/month</span>
                                    </div>
                                    <ul role="list" className="mb-8 space-y-4 text-left">
                                        <li className="flex items-center space-x-3">

                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>

                                            <span className="text-base-content/80">All benefits of the basic membership.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Access to group fitness classes such as yoga, spinning, and Zumba.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Use of additional amenities like a sauna or steam room.</span>
                                        </li>
                                    </ul>
                                    <div>
                                        <button onClick={() => setPlan("Standard")} className="w-full font-bold gap-2 shadow uppercase p-2 bg-teal-500 text-white">Select</button>
                                    </div>
                                </div>
                                <div
                                    className={`${plan === 'Premium' ? 'bg-green-50' : ''} flex flex-col p-4 mx-auto max-w-md text-center rounded-box shadow-xl xl:p-6  border border-base-300 shadow-primary/10 border-primary/10 transition hover:border-primary-focus/20 hover:shadow-primary-focus/20`}>
                                    <h3 className="text-2xl font-semibold">Premium Membership</h3>
                                    <div className="flex justify-center items-baseline my-5 lg:my-7">
                                        <span className="mr-2 text-5xl font-extrabold">$100</span>
                                        <span className="">/month</span>
                                    </div>
                                    <ul role="list" className="mb-8 space-y-4 text-left">
                                        <li className="flex items-center space-x-3">

                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>

                                            <span className="text-base-content/80">All benefits of the basic membership.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Access to group fitness classes such as yoga, spinning, and Zumba.</span>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z">
                                                </path>
                                            </svg>
                                            <span className="text-base-content/80">Discounts on additional services such as massage therapy or nutrition counseling.</span>
                                        </li>
                                    </ul>
                                    <div>
                                        <button onClick={() => setPlan("Premium")} className="w-full font-bold gap-2 shadow uppercase p-2 bg-teal-500 text-white">Select</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex justify-center items-center py-10 md:py-14 lg:py-20">
                    <div className="w-full lg:w-2/3 xl:w-1/2 bg-gray-100 p-6 md:p-8 lg:p-10 rounded shadow-md space-y-3 lg:space-y-5">
                        <p><span className="text-lg font-medium">Trainer Name :</span> <span className="opacity-80">{trainer.name}</span></p>
                        <p><span className="text-lg font-medium">Day :</span> <span className="opacity-80">{state.day.value}</span></p>
                        <p><span className="text-lg font-medium">Time :</span> <span className="opacity-80">{state.availableTime}</span></p>
                        <p><span className="text-lg font-medium">Duration :</span> <span className="opacity-80">{state.duration} hr</span></p>
                        <p><span className="text-lg font-medium">Package :</span> <span className="opacity-80">{plan}</span></p>
                        <form onSubmit={handleSubmit}>
                            <div className="w-72">
                                <Select onChange={(e) => setClassName(e)} label="Select Class">
                                    {
                                        trainer.skills.map((skill, i) => <Option key={i} value={skill}>{skill}</Option>)
                                    }
                                </Select>
                            </div>
                            <div className="mt-4 text-right">
                                <Button type="submit" className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group">
                                    <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
                                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                    <span className="relative">Join Now</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TrainerBooking;