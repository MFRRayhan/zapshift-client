import { use, useRef } from "react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function ReviewSlider({ reviewPromise }) {
  const reviews = use(reviewPromise);
  const swiperRef = useRef(null);

  return (
    <div className="container">
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h2 className="section-title mb-5">What our customers are saying</h2>
        <p className="text-gray-500">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="review-prev absolute left-0 bottom-0 z-20 flex h-10 w-10 items-center justify-center btn btn-square rounded-full btn-outline btn-primary"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="review-next absolute right-0 bottom-0 z-20 flex h-10 w-10 items-center justify-center btn btn-square rounded-full btn-outline btn-primary"
        >
          <FaArrowRight />
        </button>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          effect="coverflow"
          grabCursor
          centeredSlides
          spaceBetween={60}
          slidesPerView={3}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".review-prev",
            nextEl: ".review-next",
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="mySwiper review-slider"
        >
          {reviews.map((review) => (
            <SwiperSlide>
              <div className="bg-base-100 rounded-4xl p-8 md:p-10 shadow-sm border border-base-200">
                {/* Quote Icon */}
                <div className="mb-6">
                  <FaQuoteLeft className="text-5xl text-primary/20" />
                </div>

                {/* Content */}
                <div className="mb-8">
                  <p className="text-base-content/70 text-lg leading-relaxed">
                    {review.review}
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-dashed border-primary/30 mb-6"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <img
                      src={review.user_photoURL}
                      alt="User Photo"
                      className="w-14 rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-base-content">
                      {review.userName}
                    </h3>

                    <p className="text-sm text-base-content/50">
                      {review.user_email}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
