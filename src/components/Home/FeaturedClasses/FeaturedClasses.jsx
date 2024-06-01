import { Link } from "react-router-dom";
import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import "./FeaturedCard.css"

const FeaturedClasses = () => {
    return (
        <div className="my-12 md:my-16 lg:my-20 xl:my-24">
            <Container>
                <SectionHeader title="Featured Classes" description="Discover a variety of engaging fitness classes at FitVessel. From yoga to HIIT, our expert-led sessions cater to all levels and keep you motivated."></SectionHeader>
                <div>
                    <div className="card">
                        <Link className="card1" to="" >
                            <h3 className="text-xl font-medium mb-2">&quot;Class name&quot;</h3>
                            <p className="small mb-4">Card description with lots of great facts and interesting details.</p>
                            <h5 className=" font-ubuntu bg-black text-white px-2 py-1 rounded-full bg-opacity-80 max-w-max">5 Booking</h5>
                            <div className="go-corner" href="#">
                                <div className="go-arrow">
                                    →
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FeaturedClasses;