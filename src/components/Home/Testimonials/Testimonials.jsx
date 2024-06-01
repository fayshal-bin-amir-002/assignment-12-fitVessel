import Container from "../../shared/Container/Container";
import SectionHeader from "../../shared/SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonials = () => {

    const axiosPublic = useAxiosPublic();

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/testimonials");
            return data;
        }
    })

    return (
        <Container>
            <SectionHeader title="Testimonials" description="FitVessel transformed my routine! The tracking tools, personalized insights, and variety of classes keep me motivated and on track. Highly recommend!"></SectionHeader>
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    loop={true}
                    navigation={true}
                    breakpoints={{
                        260: {
                            slidesPerView: 1
                        },
                        720: {
                            slidesPerView: 2
                        },
                        1125: {
                            slidesPerView: 3
                        }
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper">

                    {
                        testimonials.map((testimonial) => 
                            <SwiperSlide key={testimonial._id}>
                                <section className="bg-gray-50 dark:bg-gray-800 h-[320px]">
                                    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-12 xl:py-16 lg:px-6">
                                        <figure className="max-w-screen-md mx-auto">
                                            <svg className="h-12 mx-auto mb-3 text-[#DC5F00]" viewBox="0 0 24 27" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                            <blockquote>
                                                <p className="text-lg font-medium text-gray-900 lg:text-xl dark:text-white">
                                                 {testimonial.description}   </p>
                                            </blockquote>
                                            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                                <img className="w-6 h-6 rounded-full" src={testimonial.imageUrl} alt="profile picture" />
                                                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                                    <div className="pr-3 font-medium text-gray-900 dark:text-white">{testimonial.userName}</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </section>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
        </Container>
    );
};

export default Testimonials;