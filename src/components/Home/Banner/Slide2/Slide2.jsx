import { Link } from "react-router-dom";
import "./Slide2.css"
import { RiArrowRightSLine } from "react-icons/ri";

const Slide2 = () => {
    return (
        <div className="slide2 flex justify-center items-center px-5">
            <div className="text-center text-white mx-auto lg:w-1/2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-ubuntu font-semibold mb-5 md:mb-8">Empower Your Journey <br /> with <span className="span-text text-[#DC5F00]">FitVessel</span></h2>
                <p className="mb-6 md:mb-8">Your ultimate fitness companion. Track progress, stay motivated, and achieve your health goals with our comprehensive, user-friendly fitness tracking platform.</p>
                <Link to="/all-classes">
                <button className="bg-gradient-to-r from-blue-500 to-red-500 text-white px-4 py-2 text-xl rounded font-medium focus:ring ring-black ring-opacity-10 gradient element-to-rotate">Explore Now <RiArrowRightSLine className="inline text-2xl" /></button>
                </Link>
            </div>
        </div>
    );
};

export default Slide2;