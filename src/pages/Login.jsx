import { Link, useLocation, useNavigate } from "react-router-dom";
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
          confirmButtonColor: "#009966",
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
              confirmButtonColor: "#009966",
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

  const handleDemoLogin = (role) => {
    let email = "";
    const password = import.meta.env.VITE_DEMO_LOGIN_PASSWORD;

    if (role === "admin") email = "admin@gmail.com";
    if (role === "rider") email = "rider@gmail.com";
    if (role === "user") email = "user@gmail.com";

    logIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: `Logged in as ${role}`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(location?.state || "/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
        <fieldset className="fieldset">
          {/* HEADER */}
          <div>
            <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500">Login to continue your account</p>
          </div>

          {/* EMAIL */}
          <div>
            <label className="label mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-error mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="label mb-1">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter your password",
              })}
              className="input input-bordered w-full focus:outline-none focus:border-primary"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* FORGOT */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="link link-hover text-sm text-primary font-semibold"
            >
              Forgot password?
            </Link>
          </div>

          {/* LOGIN */}
          <button className="btn btn-primary w-full">Login</button>

          {/* DIVIDER */}
          <div className="divider">OR</div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full"
          >
            <FcGoogle size={22} />
            Login with Google
          </button>

          {/* REGISTER */}
          <p className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              state={location?.state}
              className="text-primary font-semibold"
            >
              Register
            </Link>
          </p>
        </fieldset>
      </form>

      {/* ================= DEMO SECTION ================= */}
      <div className="bg-base-100 border border-base-300 rounded-xl p-4 space-y-3">
        <div className="divider text-sm text-gray-500">Quick Demo Access</div>

        <button
          type="button"
          onClick={() => handleDemoLogin("admin")}
          className="btn btn-primary btn-outline w-full"
        >
          Continue as Admin
        </button>

        <button
          type="button"
          onClick={() => handleDemoLogin("rider")}
          className="btn btn-primary btn-outline w-full"
        >
          Continue as Rider
        </button>

        <button
          type="button"
          onClick={() => handleDemoLogin("user")}
          className="btn btn-primary btn-outline w-full"
        >
          Continue as User
        </button>
      </div>
    </div>
  );
}
