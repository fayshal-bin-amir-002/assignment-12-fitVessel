import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="font-poppins">
            <p>this is main</p>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;