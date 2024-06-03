import { NavLink } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { GiRomanToga } from "react-icons/gi";
import { VscGitStashApply } from "react-icons/vsc";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";
import { VscDiffAdded } from "react-icons/vsc";



const AdminMenus = () => {

    const links = [
        { label: "Newsletter Subscribers", to: "/dashboard", icon: <FaRegNewspaper className="inline text-xl mr-1" /> },
        { label: "All Trainers", to: "all-trainers", icon: <GiRomanToga className="inline text-xl mr-1" /> },
        { label: "Applied Trainers", to: "applied-trainers", icon: <VscGitStashApply className="inline text-xl mr-1" /> },
        { label: "Balance", to: "balance", icon: <MdOutlineAccountBalanceWallet className="inline text-xl mr-1" /> },
        { label: "Add New Class", to: "addNew-class", icon: <MdOutlineNoteAdd className="inline text-xl mr-1" /> },
        { label: "Add New Forum", to: "addNew-forum", icon: <VscDiffAdded className="inline text-xl mr-1" /> },
    ]

    return (
        <ul className="p-4 space-y-3">
            {
                links.map((link, i) => <li key={i} className="text-lg font-medium hover:bg-blue-gray-200 cursor-pointer">
                    <NavLink to={link.to} className={({ isActive }) => isActive ? 'bg-blue-gray-200 block px-4 py-2' : 'block px-4 py-2'}>{link.icon} {link.label}</NavLink>
                </li>)
            }
        </ul>
    );
};

export default AdminMenus;