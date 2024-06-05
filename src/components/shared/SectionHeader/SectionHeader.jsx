import PropTypes from 'prop-types';

const SectionHeader = ({title, description}) => {
    return (
        <div className="mb-8 md:mb-12 lg:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-ubuntu font-medium border-s-4  ps-2 border-[#DC5F00] mb-4 md:mb-6" >{title}</h2>
            <p className='lg:w-1/2'>{description}</p>
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default SectionHeader;