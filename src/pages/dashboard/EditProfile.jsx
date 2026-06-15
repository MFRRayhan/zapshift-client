import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft, FaSave, FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const photoFile = watch("photo");

  const { data: userInfo = null, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      let photoURL = userInfo?.photoURL;

      // Upload new image if selected
      if (data.photo?.[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);

        const imgApiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API
        }`;

        const imageRes = await axios.post(imgApiURL, formData);

        photoURL = imageRes.data.data.url;
      }

      // Update Firebase Profile
      await updateUser(user, {
        displayName: data.displayName,
        photoURL,
      });

      // Update Database
      await axiosSecure.patch(`/users/profile/${userInfo._id}`, {
        displayName: data.displayName,
        photoURL,
      });

      await queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#16a34a",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const previewImage = photoFile?.[0]
    ? URL.createObjectURL(photoFile[0])
    : userInfo.photoURL;

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Edit Profile</h1>

          <p className="text-gray-500 mt-2">
            Update your account information and profile picture.
          </p>
        </div>

        <Link to="/dashboard" className="btn btn-outline btn-primary">
          <FaArrowLeft />
          Back To Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-72 h-72 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-base-100">
              <img
                src={previewImage}
                alt={userInfo.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-2xl font-bold mt-6">
              {watch("displayName") || userInfo.displayName}
            </h2>

            <p className="text-gray-500 mt-2 break-all">{userInfo.userEmail}</p>

            <div className="badge badge-primary badge-lg capitalize mt-4">
              {userInfo.role}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <FaUserEdit className="text-primary text-xl" />

              <h2 className="text-2xl font-bold">Profile Information</h2>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>

                <input
                  type="text"
                  defaultValue={userInfo.displayName}
                  className="input input-bordered w-full"
                  {...register("displayName", {
                    required: "Full name is required",
                  })}
                />

                {errors.displayName && (
                  <p className="text-error mt-1 text-sm">
                    {errors.displayName.message}
                  </p>
                )}
              </div>

              {/* Photo */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Profile Photo</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("photo")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>

                <input
                  type="email"
                  value={userInfo.userEmail}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              {/* Role */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Account Role</span>
                </label>

                <input
                  type="text"
                  value={userInfo.role}
                  readOnly
                  className="input input-bordered w-full bg-base-200 capitalize"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                <FaSave />

                {isSubmitting ? "Updating Profile..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
