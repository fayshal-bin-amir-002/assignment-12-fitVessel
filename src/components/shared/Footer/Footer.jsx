import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {
    return (
        <div className="bg-gray-100">
            <Container>
                <div>
                    <div className="px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
                        <div className="p-5">
                            <Link className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-medium">Fit<span className="text-[#DC5F00]">Vessel</span></Link>
                        </div>
                        <div className="p-5 space-y-3">
                            <div className="text-sm uppercase text-indigo-600 font-bold ">Links</div>
                            <Link to="/" className="block">Home</Link>
                            <Link to="/all-trainer" className="block">All Trainer</Link>
                            <Link to="/all-classes" className="block">All Classes</Link>
                        </div>
                        <div className="p-5">
                            <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
                            <a className="my-3 block" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a><a
                                className="my-3 block" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a><a
                                    className="my-3 block" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a>
                        </div>
                        <div className="p-5">
                            <div className="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
                            <a className="my-3 block" href="/#">XXX XXXX, Floor 4 San Francisco, CA
                                <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block" href="/#">contact@company.com
                                <span className="text-teal-600 text-xs p-1"></span></a>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 pt-2">
                    <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col max-w-screen-lg items-center">
                        <div className="flex justify-center items-center gap-8 md:gap-10 lg:gap-14 text-2xl">
                            <span><FaFacebook /></span>
                            <span><FaTwitter /></span>
                            <span><FaYoutube /></span>
                        </div>
                        <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;