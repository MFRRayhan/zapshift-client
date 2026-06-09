import MarqueeModule from "react-fast-marquee";

import amazon from "../assets/img/brands/amazon.png";
import amazon_vector from "../assets/img/brands/amazon_vector.png";
import casio from "../assets/img/brands/casio.png";
import moonstar from "../assets/img/brands/moonstar.png";
import randstad from "../assets/img/brands/randstad.png";
import star from "../assets/img/brands/star.png";
import start_people from "../assets/img/brands/start_people.png";

const Marquee = MarqueeModule?.default || MarqueeModule;

const logos = [
  amazon,
  amazon_vector,
  casio,
  moonstar,
  randstad,
  star,
  start_people,
];

export default function LogoSlider() {
  return (
    <section className="py-12">
      <h2 className="text-2xl text-center mb-10">
        We've helped thousands of sales teams
      </h2>
      <div className="container">
        <Marquee
          speed={50}
          pauseOnHover={true}
          gradient={false}
          autoFill={true}
        >
          {logos.map((logo, index) => (
            <div key={index} className="mx-10 flex items-center">
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
