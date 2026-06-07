import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import Logo from "./Logo";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}>Coverage</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/be-a-rider"}>Be a Rider</NavLink>
      </li>
      <li>
        <NavLink to={"/parcel-track"}>Track Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Log out?",
      text: "You will need to sign in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d92243",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged out",
              text: "You have been successfully logged out.",
              icon: "success",
              confirmButtonColor: "#16a34a",
              timer: 2000,
              showConfirmButton: false,
            });
            navigate("/login");
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
            console.log(err);
          });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="shadow-sm">
      <div className="container">
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Logo></Logo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="primary-menu menu menu-horizontal px-1 gap-3">
              {links}
            </ul>
          </div>
          <div className="navbar-end gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <button onClick={handleLogout} className="btn btn-sm btn-error">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to={"/login"}>
                  <button type="button" className="btn btn-primary">
                    Login
                  </button>
                </Link>
                <Link to={"/register"}>
                  <button
                    type="button"
                    className="btn btn-outline btn-secondary transition-all duration-100 ease-in-out hover:btn-primary"
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
