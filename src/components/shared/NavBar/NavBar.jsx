import { useState, useRef, useEffect } from "react"
import Container from "../Container/Container"
import { Link, NavLink } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";


const ProfileDropDown = (props) => {

    const { user, userLogOut } = useAuth();

    const [state, setState] = useState(false)
    const profileRef = useRef()

    const navigation = [
        { title: "Profile", path: "/profile" },
        { title: "Dashboard", path: "/dashboard" },
        { title: "Community", path: "/community" }
    ]


    useEffect(() => {
        const handleDropDown = (e) => {
            if (!profileRef.current.contains(e.target)) setState(false)
        }
        document.addEventListener('click', handleDropDown)
    }, [])

    const handleLogOut = async () => {
        await userLogOut()
        .then(() => {
            toast.success("Logged out succesfully.");
        })
        .catch((error) => {
            toast.error(error.message);
        })
    }

    return (
        <div className={`relative ${props.class}`}>
            <div className="flex items-center space-x-4">
                <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-[#DC5F00] ms-3"
                    onClick={() => setState(!state)}
                >
                    <img
                        src={user?.photoURL || "https://i.postimg.cc/cJ3DWwSx/360-F-553796090-XHr-E6-R9jwm-BJUMo9-HKl41hy-HJ5gqt9oz.jpg"}
                        className="w-full h-full rounded-full z-40"
                    />
                </button>
                <div className="lg:hidden">
                    <span className="block">{user?.displayName || "Unknown"}</span>
                    <span className="block text-sm text-gray-500">{user?.email || "Not set"}</span>
                </div>
            </div>
            <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${state ? '' : 'lg:hidden'}`}>
                {
                    navigation.map((item, idx) => (
                        <li key={idx}>
                            <Link className="block lg:hover:bg-gray-200 lg:p-2.5" to={item.path}>
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
                <li className="block lg:p-2.5">
                    {
                        user ?
                            <button onClick={handleLogOut} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#DC5F00] text-[#DC5F00]">
                                <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#DC5F00] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                <span className="relative text-[#DC5F00] transition duration-300 group-hover:text-white ease">Log Out</span>
                            </button> :
                            <Link to="/login">
                                <button className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#DC5F00] text-[#DC5F00]">
                                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#DC5F00] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                    <span className="relative text-[#DC5F00] transition duration-300 group-hover:text-white ease">Login</span>
                                </button>
                            </Link>
                    }
                </li>
            </ul>
        </div>
    )
}

const NavBar = () => {

    const { user } = useAuth();

    const [menuState, setMenuState] = useState(false)

    const navigation = [
        { title: "Home", path: "/" },
        { title: "All Trainer", path: "/all-trainer" },
        { title: "All Classes", path: "/all-classes" },
    ]
    return (
        <div className="bg-white bg-opacity-80 sticky top-0 z-30">
            <Container>
                <nav className=" bg-opacity-80">
                    <div className="flex items-center space-x-24 py-3">
                        <div className="flex-none lg:flex-initial">
                            <Link className="text-2xl md:text-3xl lg:text-4xl font-ubuntu font-medium">Fit<span className="text-[#DC5F00]">Vessel</span></Link>
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                            <div className={`bg-white p-3 lg:bg-transparent absolute z-20 w-full top-16 left-0  border-b lg:static lg:block lg:border-none ${menuState ? '' : 'hidden'}`}>
                                <ul className="mt-12 space-y-5 space-x-5 lg:flex lg:space-x-12 lg:space-y-0 lg:mt-0">
                                    {
                                        navigation.map((item, idx) => (
                                            <li key={idx} className="relative inline-flex items-center justify-center leading-normal no-underline text-lg font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500 transition group ">
                                                <NavLink to={item.path} className={({ isActive }) => isActive ? 'text-[#DC5F00]' : 'links'}>{item.title}
                                                    <span
                                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#DC5F00] bg-opacity-60 origin-bottom-right transform transition duration-200 ease-out scale-x-0 group-hover:scale-x-100 group-hover:origin-bottom-left"
                                                    ></span>
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <ProfileDropDown
                                    class="mt-5 pt-5 border-t lg:hidden"
                                />
                            </div>
                            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
                                <ProfileDropDown
                                    class="hidden lg:block"
                                />
                                <button
                                    className="outline-none text-gray-400 block lg:hidden"
                                    onClick={() => setMenuState(!menuState)}
                                >
                                    {
                                        menuState ? (
                                            <RxCross2 className="text-2xl text-black" />
                                        ) : (
                                            <HiMiniBars3BottomRight className="text-2xl text-black" />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </Container>
        </div>
    )
}

export default NavBar;