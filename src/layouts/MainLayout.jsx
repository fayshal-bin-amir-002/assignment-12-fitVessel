import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";

const MainLayout = () => {
    return (
        <div className="font-poppins">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;