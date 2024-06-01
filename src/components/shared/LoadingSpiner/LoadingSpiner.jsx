import PropTypes from 'prop-types';
import "./LoadingSpiner.css"

const LoadingSpiner = ({isBig}) => {
    return (
        <div className={`flex justify-center items-center ${isBig ? 'min-h-[70vh]' : 'min-h-[350px]'}`}>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

LoadingSpiner.propTypes = {
    isBig: PropTypes.bool
};

export default LoadingSpiner;