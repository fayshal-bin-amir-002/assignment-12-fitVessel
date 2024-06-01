import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import LoadingSpiner from "../components/shared/LoadingSpiner/LoadingSpiner";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = () => {

    const navigation = useNavigation();

    return (
        <div className="font-poppins">
            <NavBar></NavBar>
            {
                navigation.state === 'loading' ? <LoadingSpiner isBig={true}></LoadingSpiner> :
                    <Outlet></Outlet>
            }
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;