import { Link } from "react-router-dom";
import joinUsImage from "../assets/img/location-merchant.png";

export default function JoinUs() {
  return (
    <main className="container">
      <section className="relative overflow-hidden rounded-3xl bg-[#033636] text-white px-6 py-10 md:px-12 md:py-16 flex flex-col md:flex-row items-center">
        {/* Content */}
        <div className="relative z-10 w-full md:w-3/5 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-white!">
            Merchant and Customer Satisfaction
            <br className="hidden md:block" />
            is Our First Priority
          </h2>

          <p className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Our courier service delivers your
            parcels in every corner on time with reliability and care.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={"/become-a-merchant"}
              className="btn btn-primary shadow-md"
            >
              Become a Merchant
            </Link>

            <Link to={"/earn-with-courier"} className="btn btn-outline">
              Earn with Courier
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative z-10 w-full md:w-2/5 mt-10 md:mt-0 flex justify-center md:justify-end">
          <img
            src={joinUsImage}
            alt="Join Us Illustration"
            className="w-full max-w-sm md:max-w-md object-contain"
          />
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
          <svg
            width="400"
            height="200"
            viewBox="0 0 400 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50C100 20 200 80 300 50C400 20 500 80 600 50"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M0 70C100 40 200 100 300 70C400 40 500 100 600 70"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
