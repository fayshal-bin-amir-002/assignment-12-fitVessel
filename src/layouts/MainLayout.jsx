import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/shared/NavBar/NavBar";
import LoadingSpiner from "../components/shared/LoadingSpiner/LoadingSpiner";

const MainLayout = () => {

    const navigation = useNavigation();

    return (
        <div className="font-poppins">
            <NavBar></NavBar>
            {
                navigation.state === 'loading' ? <LoadingSpiner isBig={true}></LoadingSpiner> :
                    <Outlet></Outlet>
            }
        </div>
    );
};

export default MainLayout;