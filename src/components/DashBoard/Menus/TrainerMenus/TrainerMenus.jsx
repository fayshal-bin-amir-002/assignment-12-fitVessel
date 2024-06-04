import { NavLink } from "react-router-dom";
import { VscDiffAdded } from "react-icons/vsc";
import { MdManageHistory } from "react-icons/md";
import { MdAddToPhotos } from "react-icons/md";

const TrainerMenus = () => {

    const links = [
        { label: "Manage Slots", to: "manage-slots", icon: <MdManageHistory className="inline text-xl mr-1" /> },
        { label: "Add New Slots", to: "addNew-slot", icon: <MdAddToPhotos className="inline text-xl mr-1" /> },
        { label: "Add New Forum", to: "addNew-forum", icon: <VscDiffAdded className="inline text-xl mr-1" /> }
    ]

    return (
        <ul className="p-4 space-y-3">
            {
                links.map((link, i) => <li key={i} className="text-lg font-medium hover:bg-blue-gray-200 cursor-pointer">
                    <NavLink to={link.to} className={({ isActive }) => isActive ? 'bg-blue-gray-200 block px-4 py-2' : 'block px-4 py-2'} end>{link.icon} {link.label}</NavLink>
                </li>)
            }
        </ul>
    );
};

export default TrainerMenus;