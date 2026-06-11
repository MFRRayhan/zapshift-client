import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../assets/img/delivery-man.png";
import banner2 from "../assets/img/delivery-man-2.png";
import banner3 from "../assets/img/big-deliveryman.png";
import banner4 from "../assets/img/authImage.png";
import banner5 from "../assets/img/agent-pending.png";

const slides = [
  {
    id: 1,
    image: banner1,
    title: "Fast & Reliable Parcel Delivery Across Bangladesh",
    description:
      "Send parcels with confidence using real-time tracking, secure handling, and nationwide delivery coverage.",
  },
  {
    id: 2,
    image: banner2,
    title: "Track Every Shipment In Real Time",
    description:
      "Stay informed at every step with live parcel updates from pickup to final delivery.",
  },
  {
    id: 3,
    image: banner3,
    title: "Become A Rider & Earn On Your Schedule",
    description:
      "Join our growing rider network and enjoy flexible work opportunities with competitive earnings.",
  },
  {
    id: 4,
    image: banner4,
    title: "Safe & Secure Delivery For Every Parcel",
    description:
      "Our trained delivery partners and secure handling process ensure your packages arrive safely and in perfect condition.",
  },
  {
    id: 5,
    image: banner5,
    title: "Business Solutions For Merchants & E-Commerce",
    description:
      "Scale your business with bulk parcel delivery, cash-on-delivery services, and dedicated logistics support tailored for merchants.",
  },
];

export default function HeroArea() {
  return (
    <section className="w-full bg-base-100 hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        speed={2000}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="min-h-175 flex items-center">
              <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="space-y-8">
                    <div className="space-y-5">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                        Trusted Logistics Platform
                      </span>

                      <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h1>

                      <p className="text-lg text-base-content/70 max-w-xl leading-relaxed">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/parcel-track" className="btn btn-primary">
                        Track Your Parcel
                      </Link>

                      <Link to="/be-a-rider" className="btn btn-outline">
                        Become A Rider
                      </Link>
                    </div>

                    <div className="flex gap-10 pt-4">
                      <div>
                        <h3 className="text-3xl font-bold text-primary">
                          10K+
                        </h3>
                        <p className="text-sm text-base-content/60">
                          Parcels Delivered
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-primary">
                          500+
                        </h3>
                        <p className="text-sm text-base-content/60">
                          Active Riders
                        </p>
                      </div>

                      <div>
                        <h3 className="text-3xl font-bold text-primary">64</h3>
                        <p className="text-sm text-base-content/60">
                          District Coverage
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="relative z-10 w-full max-w-xl object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
