import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import authImg from "../assets/img/authImage.png";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 px-6 md:px-12 py-8 flex flex-col">
        <Logo />

        {/* Dynamic Auth Pages */}
        <div className="flex items-center justify-center flex-1 py-10 lg:py-0">
          <Outlet />
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FAFDF0] items-center justify-center p-10">
        <img
          src={authImg}
          alt="auth"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
