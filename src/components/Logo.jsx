import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

export default function Logo({ isCollapsed }) {
  return (
    <Link to={"/"}>
      <div className={`flex items-end ${isCollapsed ? "justify-center" : ""}`}>
        <img src={logo} alt="logo" className={isCollapsed ? "w-10" : ""} />
        {!isCollapsed && (
          <div className="text-3xl -ms-4 font-extrabold">ZapShift</div>
        )}
      </div>
    </Link>
  );
}
