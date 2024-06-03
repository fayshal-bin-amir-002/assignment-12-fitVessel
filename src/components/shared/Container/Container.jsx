import PropTypes from 'prop-types';

const Container = ({ children }) => {
    return (
        <div className='max-w-[2200px] mx-auto px-4 md:px-8 lg:px-14 xl:px-20'>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node
};

export default Container;