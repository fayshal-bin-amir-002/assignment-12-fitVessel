import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";
import Featured from "../../components/Home/Featured/Featured";
import About from "../../components/Home/About/About";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Fit Vessel</title>
            </Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <About></About>
        </div>
    );
};

export default Home;