import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function Login() {
  const { logIn, googleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const userEmail = data.email;
    const password = data.password;

    logIn(userEmail, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonText: "Continue",
          confirmButtonColor: "#2563eb",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          position: "center",
        });

        navigate(location?.state || "/");
      })
      .catch((err) => console.log(err));
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
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Login Successful",
              text: "Welcome back!",
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: true,
              allowOutsideClick: false,
              position: "center",
            });
            reset();
            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.log(err);

            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Something went wrong. Please try again.",
            });
          });
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: "Authentication error occurred.",
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="w-full max-w-md space-y-5"
    >
      <fieldset className="fieldset">
        <div>
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500">Login to continue your account</p>
        </div>

        {/* Email */}
        <div className="mt-10">
          <label className="label mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
            placeholder="Enter your email"
          />

          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="label mb-1">Password</label>
          <input
            {...register("password", {
              required: "Please enter your password",
            })}
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
          />

          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="text-right">
          <Link to={"/forgot-password"} className="link link-hover text-sm">
            Forgot password?
          </Link>
        </div>

        <button className="btn btn-primary w-full">Login</button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
        >
          <FcGoogle size={22} />
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            state={location?.state}
            className="text-secondary font-semibold"
          >
            Register
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
