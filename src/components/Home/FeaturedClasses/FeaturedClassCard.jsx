import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const FeaturedClassCard = ({ item }) => {
    return (
        <div className="card">
            <Link className="card1" to="/all-classes" >
                <div className='flex flex-col justify-between'>
                    <div className='mb-5'>
                        <h5 className=" font-ubuntu bg-black text-white px-2 py-1 rounded-full bg-opacity-80 max-w-max mb-5">{item.totalBooking} Bookings</h5>
                        <h3 className="text-xl font-medium mb-2 border-b-2 pb-2 border-green-400 max-w-max">&quot;{item.name}&quot;</h3>
                    </div>
                    <p className="small">{item.description.slice(0, 80)} . . .</p>
                </div>
                <div className="go-corner" href="#">
                    <div className="go-arrow">
                        →
                    </div>
                </div>
            </Link>
        </div>
    );
};

FeaturedClassCard.propTypes = {
    item: PropTypes.object
};

export default FeaturedClassCard;