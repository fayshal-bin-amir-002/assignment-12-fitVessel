import PropTypes from 'prop-types';

const EmptyData = ({ title }) => {
    return (
        <div className="min-h-[70vh] w-full flex items-center justify-center">
            <p className="text-3xl md:text-4xl lg:text-5xl text-gray-700 font-medium">{title}</p>
        </div>
    );
};

EmptyData.propTypes = {
    title: PropTypes.string
};

export default EmptyData;