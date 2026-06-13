import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import {
  FaEdit,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Profile() {
  const { user } = useAuth();
  console.log(user);

  const { data: userInfo = null, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-base-content">My Profile</h1>

        <p className="text-gray-500 mt-2">
          View and manage your account information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDEBAR */}
        <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm h-100% lg:sticky lg:top-24">
          <div className="flex flex-col items-center text-center">
            <div className="w-80 h-80 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-base-100 mb-5">
              <img
                src={userInfo.photoURL}
                alt={userInfo.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-2xl font-bold">{userInfo.displayName}</h2>

            <p className="text-gray-500 mt-1 break-all">{userInfo.userEmail}</p>

            <div className="badge badge-primary badge-lg capitalize mt-4">
              {userInfo.role}
            </div>

            <button className="btn btn-outline btn-primary mt-6">
              <FaEdit />
              Edit Profile
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* PERSONAL INFORMATION */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-base-content">
                Personal Information
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Basic information associated with your account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaEdit className="text-primary" />
                  <span className="text-sm text-gray-500">Full Name</span>
                </div>

                <p className="font-semibold text-lg">{userInfo.displayName}</p>
              </div>

              <div className="bg-base-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaEnvelope className="text-primary" />
                  <span className="text-sm text-gray-500">Email Address</span>
                </div>

                <p className="font-semibold break-all">{userInfo.userEmail}</p>
              </div>

              <div className="bg-base-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaCalendarAlt className="text-primary" />
                  <span className="text-sm text-gray-500">Member Since</span>
                </div>

                <p className="font-semibold">
                  {moment(userInfo.createdAt).format("DD MMM YYYY")}
                </p>
              </div>

              <div className="bg-base-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <FaUserShield className="text-primary" />
                  <span className="text-sm text-gray-500">Account Status</span>
                </div>

                <p className="font-semibold text-primary">Active</p>
              </div>
            </div>
          </div>

          {/* ACCOUNT INFORMATION */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-base-content">
                Account Information
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Technical details related to your account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">User ID</p>

                <p className="font-medium break-all">{userInfo._id}</p>
              </div>

              <div className="bg-base-200 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Account Role</p>

                <p className="font-semibold capitalize text-primary">
                  {userInfo.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
