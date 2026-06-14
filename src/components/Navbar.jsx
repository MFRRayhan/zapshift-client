import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import Logo from "./Logo";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import UserDropdown from "../utils/UserDropdown";

export default function Navbar() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = null } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

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
        <NavLink to={"/parcel-track"}>Track Parcel</NavLink>
      </li>

      {userInfo?.role === "user" && (
        <>
          <li>
            <NavLink to={"/send-parcel"}>Send Parcel</NavLink>
          </li>
          <li>
            <NavLink to={"/be-a-rider"}>Be a Rider</NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink to={"/dashboard"}>Dashboard</NavLink>
          </li>
        </>
      )}
    </>
  );

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
              <UserDropdown userInfo={userInfo} />
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
