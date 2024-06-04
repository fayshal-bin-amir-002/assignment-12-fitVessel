import { NavLink } from "react-router-dom";
import { VscVmActive } from "react-icons/vsc";
import { TbBrandBooking } from "react-icons/tb";


const MemberMenus = () => {

    const links = [
        { label: "Active Logs", to: "active-logs", icon: <VscVmActive className="inline text-xl mr-1" /> },
        { label: "Booked Trainer", to: "booked-trainer", icon: <TbBrandBooking className="inline text-xl mr-1" /> }
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

export default MemberMenus;