import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Container from '../../shared/Container/Container';

const NewsLetter = () => {

    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        const subscribeUser = { name, email };

        const { data } = await axiosPublic.post("/subscribes", subscribeUser);
        
        try {
            if (data.insertedId) {
                toast.success("Subscribed successfully.");
            } else {
                toast.error("Already subscribed");
            }
        } catch (error) {
            toast.error(error.message);
        }

        form.reset();
    }

    return (
        <Container>
            <div>
                <div className="rounded-3xl bg-[#DC5F00] flex flex-col items-center lg:flex-row gap-6 md:gap-8 lg:gap-10 p-8 md:p-12 lg:p-16">
                    <div className='text-white lg:w-1/2'>
                        <h3 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Stay Informed with Our Fitness Newsletter</h3>
                        <p>Subscribe to our newsletter for the latest fitness tips, workout routines, healthy recipes, and exclusive offers delivered straight to your inbox. Stay motivated and informed!</p>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className='space-y-3'>
                            <input type="text" name="name" id="" className='p-3 w-full rounded-lg' placeholder='Enter your name...' required />
                            <input type="email" name="email" id="" className='p-3 w-full rounded-lg' placeholder='Enter your email...' required />
                            <button className="cursor-pointer relative group overflow-hidden border-2 px-8 py-2 border-green-500 w-full rounded-lg">
                                <span className="font-bold text-white text-xl relative z-10 group-hover:text-green-500 duration-500">Subscribe Now</span>
                                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:-translate-x-full h-full"></span>
                                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-x-full h-full"></span>

                                <span className="absolute top-0 left-0 w-full bg-green-500 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
                                <span className="absolute delay-300 top-0 left-0 w-full bg-green-500 duration-500 group-hover:translate-y-full h-full"></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NewsLetter;