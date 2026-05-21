import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="flex items-end">
        <img src={logo} alt="logo" />
        <div className="text-3xl -ms-4 font-extrabold">ZapShift</div>
      </div>
    </Link>
  );
}
