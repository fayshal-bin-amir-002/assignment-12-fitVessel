import { Outlet } from "react-router-dom";
import Container from "../components/shared/Container/Container";

import SideBar from "../components/DashBoard/SideBar.jsx/SideBar";

const DashBoard = () => {

    return (
        <Container>
            <SideBar></SideBar>
            <div>
                <Outlet></Outlet>
            </div>
        </Container>
    );
};

export default DashBoard;