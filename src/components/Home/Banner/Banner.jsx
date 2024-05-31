import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import Slide1 from './Slide1/Slide1';
import Slide2 from './Slide2/Slide2';
import Slide3 from './Slide3/Slide3';

const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper h-[550px] md:h-[650px] lg:h-[850px]"
            >
                <SwiperSlide>
                    <Slide2></Slide2>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide1></Slide1>
                </SwiperSlide>
                <SwiperSlide>
                    <Slide3></Slide3>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;