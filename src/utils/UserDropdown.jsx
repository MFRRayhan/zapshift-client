import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const UserDropdown = ({ userInfo }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
          });
      }
    });
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-3 border border-primary/30 p-2 rounded-2xl cursor-pointer hover:bg-base-200 transition-all duration-200"
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-semibold">{userInfo?.displayName}</p>

          <p className="text-xs capitalize text-primary font-semibold">
            {userInfo?.role || "user"}
          </p>
        </div>

        <img
          src={userInfo?.photoURL || "https://i.ibb.co/31m686y/user-avatar.png"}
          alt={userInfo?.displayName}
          className="w-12 h-12 border-2 p-1 rounded-full object-cover border-base-300"
        />

        <FaChevronDown className="hidden sm:block text-xs text-gray-500" />
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-999 mt-3 w-60 bg-base-100 rounded-2xl border border-base-300 shadow-xl p-2"
      >
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-base-200 transition-all"
          >
            <FaUser className="text-primary" />
            <span>My Profile</span>
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-error hover:bg-error/10 transition-all text-left"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
