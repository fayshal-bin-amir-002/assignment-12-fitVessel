import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";

const MenuItems = () => {

    const { userLogOut } = useAuth();

    const handleLogout = async () => {
        await userLogOut()
        .then(() => {
            toast.success("Logged out succesfully.");
        })
        .catch((error) => {
            toast.error(error.message);
        })
    }

    const links = [
        { label: "Home", address: "/", icon: <FaHome className="inline text-xl mr-1" /> },
        { label: "Profile", address: "/profile", icon: <CgProfile className="inline text-xl mr-1" /> }
    ]

    return (
        <ul className="p-4">
            {
                links.map((link, i) => <li key={i} className="">
                    <Link to={link.address} className="block text-lg font-medium p-2.5 hover:bg-blue-gray-200 cursor-pointer">{link.icon} {link.label}</Link>
                </li>)
            }
            <li onClick={handleLogout} className="block text-lg font-medium p-2.5 hover:bg-blue-gray-200 cursor-pointer">
                <span><CgLogOut className="inline text-xl mr-1" /> Log Out</span>
            </li>
        </ul>
    );
};

export default MenuItems;