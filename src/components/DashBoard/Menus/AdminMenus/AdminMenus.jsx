import { NavLink } from "react-router-dom";

const AdminMenus = () => {

    const links = [
        {label: "Newsletter Subscribers", to: "newsletter-subscribers"},
        {label: "All Trainers", to: "all-trainers"},
        {label: "Applied Trainers", to: "applied-trainers"},
        {label: "Balance", to: "balance"},
        {label: "Add New Class", to: "addNew-class"},
        {label: "Add New Forum", to: "addNew-forum"},
    ]

    return (
        <ul className="p-4">
            {
                links.map((link, i) => <li key={i} className="text-lg font-medium p-2.5 hover:bg-blue-gray-400 cursor-pointer">
                    <NavLink to={link.to} className={({isActive}) => isActive?  'bg-blue-gray-300 block': 'block'}>{link.label}</NavLink>
                </li>)
            }
        </ul>
    );
};

export default AdminMenus;