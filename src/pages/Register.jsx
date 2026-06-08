import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";

export default function Register() {
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

  const handleRegistration = (data) => {
    const displayName = data.name;
    const userEmail = data.email;
    const password = data.password;
    const profileImg = data.photo[0];

    createUser(userEmail, password)
      .then((result) => {
        const user = result.user;
        const formData = new FormData();
        formData.append("image", profileImg);
        const imgApiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`;

        axios
          .post(imgApiURL, formData)
          .then((result) => {
            const photoURL = result.data.data.url;
            const profile = {
              displayName,
              photoURL,
            };

            updateUser(user, profile)
              .then(() => {
                const userInfo = {
                  displayName,
                  photoURL,
                  userEmail,
                  role: "user",
                  createdAt: new Date().toISOString(),
                };

                axiosSecure.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    Swal.fire({
                      icon: "success",
                      title: "Registration Completed",
                      text: "Your account has been created successfully.",
                      confirmButtonText: "Continue",
                      confirmButtonColor: "#2563eb",
                      timer: 2500,
                      timerProgressBar: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      position: "center",
                    });
                  }

                  reset();
                  navigate(location?.state || "/");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        const user = res.user;
        const newUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          userEmail: user.email,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        axiosSecure
          .post("/users", newUser)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Registration Completed",
                text: "Your account has been created successfully.",
                confirmButtonText: "Continue",
                confirmButtonColor: "#2563eb",
                timer: 2500,
                timerProgressBar: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                position: "center",
              });
            }

            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
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

        {/* Name */}
        <div>
          <label className="label mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full focus:outline-none focus:border-primary"
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Profile img */}
        <div>
          <label className="label mb-1 font-medium">Upload Profile Photo</label>
          <input
            type="file"
            {...register("photo", { required: "Photo is required" })}
            className="file-input input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 mt-1">{errors.photo.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full focus:outline-none focus:border-primary"
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
            className="input input-bordered w-full focus:outline-none focus:border-primary"
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
          <Link
            to="/login"
            state={location?.state}
            className="text-secondary font-semibold"
          >
            Login
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
