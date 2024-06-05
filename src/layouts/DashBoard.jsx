import { Outlet, useNavigation } from "react-router-dom";
import Container from "../components/shared/Container/Container";

import SideBar from "../components/DashBoard/SideBar.jsx/SideBar";
import LoadingSpiner from "../components/shared/LoadingSpiner/LoadingSpiner";
import { Helmet } from "react-helmet-async";

const DashBoard = () => {

    const navigation = useNavigation();

    return (
        <Container>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <SideBar></SideBar>
            <div className="lg:ps-64">
                {
                    navigation.state === 'loading' ? <LoadingSpiner isBig={true}></LoadingSpiner> :
                        <Outlet></Outlet>
                }
            </div>
        </Container>
    );
};

export default DashBoard;