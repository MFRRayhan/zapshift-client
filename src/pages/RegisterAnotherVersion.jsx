import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaCamera } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function RegisterAnotherVersion() {
  const { createUser, googleLogin, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState("https://i.ibb.co/4pDNDk1/avatar.png");
  const [fileName, setFileName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRegistration = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const newUser = { name, email };

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const profile = {
          displayName: name,
        };

        updateUser(user, profile);

        axiosSecure.post("/users", newUser).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 2500,
        });

        reset();
        setPreview("https://i.ibb.co/4pDNDk1/avatar.png");
        setFileName("");

        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => navigate(location?.state || "/"))
      .catch(console.log);
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      className="w-full max-w-md space-y-5"
    >
      <fieldset className="fieldset">
        <div>
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500">Register to access your account</p>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-primary">
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer">
              <FaCamera size={12} />
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.photo && (
                <p className="text-red-500 mt-1">{errors.photo.message}</p>
              )}
            </label>
          </div>

          <p className="text-xs text-gray-500">
            {fileName || "Upload Profile Picture"}
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="label mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters required" },
            })}
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <button className="btn btn-primary w-full">Register</button>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="btn btn-outline w-full"
        >
          <FcGoogle size={22} />
          Register with Google
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-semibold">
            Login
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
