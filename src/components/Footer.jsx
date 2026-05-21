import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="py-20 bg-black text-white">
      <div className="container">
        <div className="flex flex-col gap-5 items-center justify-center max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            <Logo></Logo>
            <p className="text-center">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          {/* Footer navbar */}
          <div className="flex items-center gap-10 py-5">
            <Link to={"/services"}>Services</Link>
            <Link to={"/coverage"}>Coverage</Link>
            <Link to={"/about-us"}>About Us</Link>
            <Link to={"/pricing"}>Pricing</Link>
            <Link to={"/blog"}>Blog</Link>
            <Link to={"/contact"}>Contact</Link>
          </div>

          {/* social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="bg-primary rounded-full p-2 text-secondary transition-all ease-in-out duration-100 hover:bg-secondary hover:text-primary"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.x.com"
              target="_blank"
              className="bg-primary rounded-full p-2 text-secondary transition-all ease-in-out duration-100 hover:bg-secondary hover:text-primary"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="bg-primary rounded-full p-2 text-secondary transition-all ease-in-out duration-100 hover:bg-secondary hover:text-primary"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              className="bg-primary rounded-full p-2 text-secondary transition-all ease-in-out duration-100 hover:bg-secondary hover:text-primary"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
