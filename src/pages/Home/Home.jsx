import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div className="min-h-screen w-full bg-red-200">
            <Helmet>
                <title>Home | Fit Vessel</title>
            </Helmet>
            <p>this is home</p>
        </div>
    );
};

export default Home;