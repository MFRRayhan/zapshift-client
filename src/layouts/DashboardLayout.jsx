import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FaBox,
  FaCreditCard,
  FaMotorcycle,
  FaUserCheck,
  FaUsers,
} from "react-icons/fa6";
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
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

const PortalTooltip = ({ children, content, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);

  const handleMouseEnter = () => {
    if (!isVisible) return;
    const rect = targetRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + rect.height / 2,
      left: rect.right + 12, // Gap from the icon container
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsHovered(false);
    // Listen to scroll to hide tooltip when scrolling
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  return (
    <div
      ref={targetRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full flex justify-center relative"
    >
      {children}
      {isVisible &&
        isHovered &&
        createPortal(
          <div
            className="fixed z-[99999] px-3 py-1.5 text-xs font-semibold text-neutral-content bg-neutral rounded shadow-xl pointer-events-none transform -translate-y-1/2 whitespace-nowrap flex items-center"
            style={{ top: coords.top, left: coords.left }}
          >
            {/* Tooltip Arrow pointing left */}
            <div className="absolute left-0 top-1/2 -translate-x-[4px] -translate-y-1/2 w-2 h-2 bg-neutral rotate-45 rounded-sm"></div>
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default function DashboardLayout() {
  const axiosSecure = useAxiosSecure();
  const { user, logout } = useAuth();
  const { role } = useRole();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const { data: userInfo = null, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const NavItem = ({ to, icon: Icon, label, end = false }) => (
    <PortalTooltip content={label} isVisible={!isDrawerOpen}>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center rounded-xl text-sm font-medium transition-all ${
            isDrawerOpen
              ? "gap-3 px-4 py-3 justify-start w-full"
              : "justify-center p-3 w-12 h-12 mx-auto"
          } ${isActive ? "bg-primary/10 text-primary" : "text-base-content/70 hover:bg-base-200"}`
        }
      >
        <Icon className="text-xl shrink-0" />
        <span className={`truncate ${!isDrawerOpen ? "hidden" : "block"}`}>
          {label}
        </span>
      </NavLink>
    </PortalTooltip>
  );

  const sidebarClasses = `h-screen flex flex-col bg-base-100 border-r border-base-300 shrink-0 transition-all duration-300 z-50 absolute lg:relative ${
    isDrawerOpen
      ? "w-64 translate-x-0"
      : "-translate-x-full lg:translate-x-0 lg:w-20"
  }`;

  return (
    <div className="h-screen flex bg-base-200 text-base-content overflow-hidden relative">
      {/* Mobile Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={sidebarClasses}>
        {/* LOGO */}
        <div
          className={`h-20 flex items-center border-b border-base-300 shrink-0 transition-all ${isDrawerOpen ? "px-6" : "px-0 justify-center"}`}
        >
          <Logo isCollapsed={!isDrawerOpen} />
        </div>

        {/* NAVIGATION (ONLY THIS SCROLLS) */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          <nav className="space-y-1">
            <p
              className={`text-xs font-bold uppercase text-base-content/40 px-3 mb-3 ${!isDrawerOpen && "hidden"}`}
            >
              Main Menu
            </p>

            {/* HOME */}
            <NavItem to="/" icon={IoHomeOutline} label="Home" end />

            {/* PROFILE */}
            <NavItem
              to="/dashboard"
              icon={FaUserCircle}
              label="My Profile"
              end
            />

            {/* USER ROUTES */}
            {role === "user" && (
              <>
                <NavItem
                  to="/dashboard/my-parcels"
                  icon={FaBox}
                  label="My Parcels"
                />
                <NavItem
                  to="/dashboard/my-payments"
                  icon={FaCreditCard}
                  label="My Payments"
                />
              </>
            )}

            {/* RIDER ROUTES */}
            {role === "rider" && (
              <>
                <NavItem
                  to="/dashboard/assigned-deliveries"
                  icon={FaTruck}
                  label="Assigned Deliveries"
                />
                <NavItem
                  to="/dashboard/completed-deliveries"
                  icon={FaCheckCircle}
                  label="Completed Deliveries"
                />
                <NavItem
                  to="/dashboard/rider-payments"
                  icon={FaCreditCard}
                  label="Rider Payments"
                />
              </>
            )}

            {/* ADMIN ROUTES */}
            {role === "admin" && (
              <>
                <NavItem
                  to="/dashboard/admin-parcels"
                  icon={FaBoxOpen}
                  label="All Parcels"
                />
                <NavItem
                  to="/dashboard/rider-applications"
                  icon={FaMotorcycle}
                  label="Rider Applications"
                />
                <NavItem
                  to="/dashboard/assign-riders"
                  icon={FaUserCheck}
                  label="Assign Riders"
                />
                <NavItem
                  to="/dashboard/users-management"
                  icon={FaUsers}
                  label="Users Management"
                />
                <NavItem
                  to="/dashboard/payment-history"
                  icon={FaCreditCard}
                  label="Payment History"
                />
              </>
            )}
          </nav>
        </div>

        {/* ================= BOTTOM FIXED ================= */}
        <div className="p-4 border-t border-base-300 bg-base-100 shrink-0">
          <PortalTooltip content="Logout" isVisible={!isDrawerOpen}>
            <button
              onClick={logout}
              className={`btn btn-error btn-outline transition-all ${
                isDrawerOpen
                  ? "w-full justify-start gap-3"
                  : "p-0 w-12 h-12 justify-center rounded-xl mx-auto flex items-center"
              }`}
            >
              <IoLogOutOutline className="text-xl shrink-0" />
              <span className={!isDrawerOpen ? "hidden" : "block"}>
                Logout Account
              </span>
            </button>
          </PortalTooltip>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="h-20 bg-base-100 border-b border-base-300 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="btn btn-ghost btn-circle"
            >
              {isDrawerOpen ? (
                <BsLayoutSidebarInset className="text-2xl" />
              ) : (
                <BsLayoutSidebarInsetReverse className="text-2xl" />
              )}
            </button>
            <h1 className="text-lg font-bold hidden md:block">
              Hello, {userInfo?.displayName || "User"}
            </h1>
          </div>

          <UserDropdown userInfo={userInfo} />
        </header>

        {/* ================= CONTENT (ONLY SCROLL AREA) ================= */}
        <main className="flex-1 overflow-y-auto py-6 bg-base-200/40">
          <div className="px-4 md:px-8 space-y-6">
            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 bg-linear-to-r from-primary/90 via-primary to-secondary/90 text-white shadow-lg">
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
