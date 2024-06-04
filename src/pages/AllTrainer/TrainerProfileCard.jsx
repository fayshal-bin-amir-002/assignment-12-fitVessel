import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TrainerProfileCard = ({ trainer }) => {
    
    return (
        <div className='h-full'>
            <div className="relative mx-auto shadow-md bg-white flex flex-col justify-between gap-2 h-full">
                <div>
                    <div className="rounded mt-20 overflow-hidden">
                        <div className="absolute -mt-20 w-full flex justify-center">
                            <div className="h-32 w-32">
                                <img src={trainer?.image} className="rounded-full object-cover h-full w-full shadow-md" />
                            </div>
                        </div>
                        <div className="px-6 mt-16">
                            <h1 className="font-semibold text-2xl text-center mb-1">{trainer?.name}</h1>
                            <p className="text-gray-800 text-sm text-center">Experience : {trainer?.experience} year</p>
                            
                            <div className='flex gap-1.5 items-center flex-wrap py-2'>
                                {
                                    trainer.skills.map((skill, i) => <span key={i} className="border border-green-600 rounded-full px-4 text-xs text-green-600 py-0.5">
                                        {skill?.value}
                                    </span>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center p-2">
                    <a href="#" className="mx-5">
                        <div aria-label="Github">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" className="feather feather-github">
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                </path>
                            </svg>
                        </div>
                    </a>
                    <a href="#" className="mx-5">
                        <div aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" className="feather feather-twitter">
                                <path
                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                </path>
                            </svg>
                        </div>
                    </a>
                    <a href="#" className="mx-5">
                        <div aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" className="feather feather-instagram">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </div>
                    </a>
                </div>
                <div className='flex justify-center'>
                    <Link to={`/trainer-details/${trainer._id}`}>
                        <button className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#DC5F00] before:to-[#d39361] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                            Know More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

TrainerProfileCard.propTypes = {
    trainer: PropTypes.object
};

export default TrainerProfileCard;