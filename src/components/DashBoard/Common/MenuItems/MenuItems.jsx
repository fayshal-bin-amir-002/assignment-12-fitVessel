import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const MenuItems = () => {

    const { userLogOut } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        await userLogOut()
        .then(() => {
            navigate("/");
            toast.success("Logged out succesfully.");
        })
        .catch((error) => {
            toast.error(error.message);
        })
    }

    const links = [
        { label: "Home", address: "/" },
        { label: "Profile", address: "/profile" }
    ]

    return (
        <ul className="p-4">
            {
                links.map((link, i) => <li key={i} className="">
                    <Link to={link.address} className="block text-lg font-medium p-2.5 hover:bg-blue-gray-400 cursor-pointer">{link.label}</Link>
                </li>)
            }
            <li onClick={handleLogout} className="block text-lg font-medium p-2.5 hover:bg-blue-gray-400 cursor-pointer">
                <span>Log Out</span>
            </li>
        </ul>
    );
};

export default MenuItems;