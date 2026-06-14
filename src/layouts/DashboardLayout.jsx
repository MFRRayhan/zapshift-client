import { useQuery } from "@tanstack/react-query";
import {
  FaBox,
  FaCreditCard,
  FaMotorcycle,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa6";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaTruck,
  FaUserCircle,
} from "react-icons/fa";
import UserDropdown from "../utils/UserDropdown";

export default function DashboardLayout() {
  const axiosSecure = useAxiosSecure();
  const { user, logout } = useAuth();
  const { role } = useRole();

  const { data: userInfo = null, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="h-screen flex bg-base-200 text-base-content overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 h-screen flex flex-col bg-base-100 border-r border-base-300 shrink-0">
        {/* LOGO */}
        <div className="h-20 flex items-center px-6 border-b border-base-300 shrink-0">
          <Logo />
        </div>

        {/* NAVIGATION (ONLY THIS SCROLLS) */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            <p className="text-xs font-bold uppercase text-base-content/40 px-3 mb-3">
              Main Menu
            </p>

            {/* HOME */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
              }
            >
              <IoHomeOutline />
              Home
            </NavLink>

            {/* PROFILE */}
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
              }
            >
              <FaUserCircle />
              My Profile
            </NavLink>

            {/* USER ROUTES */}
            {role === "user" && (
              <>
                {/* PARCELS */}
                <NavLink
                  to="/dashboard/my-parcels"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
                  }
                >
                  <FaBox />
                  My Parcels
                </NavLink>

                {/* MY PAYMENTS */}
                <NavLink
                  to="/dashboard/my-payments"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
                  }
                >
                  <FaCreditCard />
                  My Payments
                </NavLink>
              </>
            )}

            {/* RIDER ROUTES */}
            {role === "rider" && (
              <>
                <NavLink
                  to="/dashboard/assigned-deliveries"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaTruck />
                  Assigned Deliveries
                </NavLink>

                <NavLink
                  to="/dashboard/completed-deliveries"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaCheckCircle />
                  Completed Deliveries
                </NavLink>

                <NavLink
                  to="/dashboard/rider-payments"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
                  }
                >
                  <FaCreditCard />
                  Rider Payments
                </NavLink>
              </>
            )}

            {/* ADMIN ROUTES */}
            {role === "admin" && (
              <>
                {/* PARCELS */}
                <NavLink
                  to="/dashboard/admin-parcels"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaBoxOpen />
                  All Parcels
                </NavLink>

                {/* RIDER APPLICATIONS */}
                <NavLink
                  to="/dashboard/rider-applications"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaMotorcycle />
                  Rider Applications
                </NavLink>

                {/* ASSIGN RIDERS */}
                <NavLink
                  to="/dashboard/assign-riders"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaUserCheck />
                  Assign Riders
                </NavLink>

                {/* USERS MANAGEMENT */}
                <NavLink
                  to="/dashboard/users-management"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-base-content/70 hover:bg-base-200"
                    }`
                  }
                >
                  <FaUsers />
                  Users Management
                </NavLink>

                {/* PAYMENT HISTORY */}
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-base-content/70 hover:bg-base-200"
                }`
                  }
                >
                  <FaCreditCard />
                  Payment History
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* ================= BOTTOM FIXED ================= */}
        <div className="p-4 border-t border-base-300 bg-base-100 shrink-0">
          {/* <p className="text-xs font-bold uppercase text-base-content/40 px-3 mb-2">
            Support
          </p>

          <button className="btn btn-ghost w-full justify-start">
            <FaGear />
            Settings
          </button> */}

          <button
            onClick={logout}
            className="btn btn-error btn-outline w-full justify-start mt-2"
          >
            <IoLogOutOutline />
            Logout Account
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 bg-base-100 border-b border-base-300 flex items-center justify-between px-8 shrink-0">
          <h1 className="text-lg font-bold">
            Hello, {userInfo?.displayName || "User"}
          </h1>

          <UserDropdown userInfo={userInfo} />
        </header>

        {/* ================= CONTENT (ONLY SCROLL AREA) ================= */}
        <main className="flex-1 overflow-y-auto py-6 bg-base-200/40">
          <div className="px-8 space-y-6">
            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-2xl p-8 bg-linear-to-r from-primary/90 via-primary to-secondary/90 text-white shadow-lg">
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white!">
                  Welcome back
                </h2>

                <p className="text-sm md:text-base text-white/80 max-w-xl">
                  Manage your parcels, track deliveries, and monitor payments
                  all from a single powerful dashboard.
                </p>

                {/* optional quick stats hint */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-white/15 backdrop-blur">
                    Fast Delivery System
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/15 backdrop-blur">
                    Real-time Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* ROUTE CONTENT WRAPPER */}
            <div className="bg-base-100 border border-base-300 rounded-2xl p-4 md:p-6 shadow-sm">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
