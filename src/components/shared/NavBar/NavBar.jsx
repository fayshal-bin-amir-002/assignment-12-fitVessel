import { useState, useRef, useEffect } from "react"
import Container from "../Container/Container"
import { Link, NavLink } from "react-router-dom"

// Profile Dropdown
const ProfileDropDown = (props) => {

    const [state, setState] = useState(false)
    const profileRef = useRef()

    const navigation = [
        { label: 'Dashboard', to: "/dashboard" },
        { label: 'Community', to: "/community" }
    ]


    useEffect(() => {
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [])

    return (
        <div className="bg-opacity-80 w-full">
            <div className={`relative ${props.class} z-50 w-full`}>
                <div className="">
                    <div className="flex items-center space-x-4">
                        <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-[#DC5F00]"
                            onClick={() => setState(!state)}
                        >
                            <img
                                src="https://i.postimg.cc/cJ3DWwSx/360-F-553796090-XHr-E6-R9jwm-BJUMo9-HKl41hy-HJ5gqt9oz.jpg"
                                className="w-full h-full rounded-full"
                            />
                        </button>
                        <div className="lg:hidden">
                            <span className="block">Micheal John</span>
                            <span className="block text-sm">john@gmail.com</span>
                        </div>
                    </div>
                    <ul className={`bg-white rounded p-2 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                        {
                            navigation.map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.to} className="block lg:p-2.5 hover:bg-blue-gray-100 rounded" >{item.label}</Link>
                                </li>
                            ))
                        }
                        <li className="block lg:p-2.5">
                            <Link>
                                <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#DC5F00] text-[#DC5F00] ">
                                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#DC5F00] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                    <span className="relative text-[#DC5F00] transition duration-300 group-hover:text-white ease">Login</span>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


const NavBar = () => {

    const [menuState, setMenuState] = useState(false)

    const navLinks = [
        { label: 'Home', to: "/" },
        { label: 'All Trainer', to: "/all-trainer" },
        { label: 'All Classes', to: "/all-classes" }
    ]

    return (
        <div className="bg-white bg-opacity-80 sticky top-0">
            <Container>
                <nav className="sticky w-full top-0">
                    <div className="flex justify-between items-center space-x-8 py-3 mx-auto">
                        <div className="flex-none lg:flex-initial">
                            <Link to="/" className=" font-ubuntu font-semibold text-2xl md:text-3xl lg:text-4xl">Fit<span className="text-[#DC5F00]">Vessel</span></Link>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className={` absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                                <ul className=" flex items-center gap-6 md:gap-8 lg:gap-16">
                                    {
                                        navLinks.map((item, idx) => (
                                            <li key={idx} className="text-lg font-medium">
                                                <NavLink to={item.to}>{item.label}</NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <ProfileDropDown
                                    class="mt-5 pt-5 border-t lg:hidden"
                                />
                            </div>

                        </div>
                        <div className="flex items-center gap-6">
                            <ProfileDropDown
                                class="hidden lg:block"
                            />
                            <button
                                className="outline-none text-gray-400 block lg:hidden"
                                onClick={() => setMenuState(!menuState)}
                            >
                                {
                                    menuState ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </nav>
            </Container>
        </div>
    );
};

export default NavBar;