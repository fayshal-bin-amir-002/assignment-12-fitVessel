import PropTypes from 'prop-types';
import AvatarCard from './AvatarCard';

const ClassCard = ({ item }) => {
    return (
        <div className="flex flex-col rounded-lg shadow-lg">
            <div className="w-full rounded-lg">
                <img src={item.image} className="h-[300px] w-full object-cover rounded-t-lg" alt="" />
            </div>
            <div className="flex flex-col justify-between w-full h-full p-6">

                <div>
                    <h2 className="text-2xl font-semibold leading-none border-b-2 pb-2 max-w-max border-[#DC5F00]">{item.name}</h2>
                    <p className="my-4 text-sm opacity-80">{item.description}</p>
                </div>
                <div className="flex items-center flex-wrap justify-start gap-4 lg:gap-6">
                    {
                        item.matchedTrainers.length === 0 ? <p className='text-red-400'>No trainer assigned for this class yet!</p> :
                            item.matchedTrainers.map((trainer, i) => <AvatarCard key={i} trainer={trainer}></AvatarCard>)
                    }
                </div>

            </div>
        </div>
    );
};

ClassCard.propTypes = {
    item: PropTypes.object
};

export default ClassCard;