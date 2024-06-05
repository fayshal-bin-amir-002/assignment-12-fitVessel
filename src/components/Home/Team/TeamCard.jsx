import PropTypes from 'prop-types';

const TeamCard = ({ team }) => {
    return (
        <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
            <div id="profile"
                className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                <div className="p-5 lg:p-3 text-center lg:text-left">
                    <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${team?.image})` }}></div>

                    <h1 className="text-2xl font-semibold pt-8 lg:pt-0">{team?.name}</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-2 border-b-2 border-green-500 opacity-25"></div>
                    <p className="pt-2 text-base font-semibold flex items-center justify-center lg:justify-start">
                        Experience : {team.experience} year
                    </p>
                    <div className='flex gap-1.5 items-center flex-wrap pt-2'>
                        {
                            team.skills.map((skill, i) => <span key={i} className="border border-green-600 rounded-full px-4 text-xs text-green-600 py-0.5">
                                {skill.value}
                            </span>)
                        }
                    </div>
                    <p className="pt-4 text-sm text-left">{team.biography.slice(0, 80)} . . .</p>

                </div>
            </div>
            <div className="w-full lg:w-2/5">
                <img src={team?.image} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block lg:h-[250px] object-cover" />
            </div>
        </div>
    );
};

TeamCard.propTypes = {
    team: PropTypes.object
};

export default TeamCard;