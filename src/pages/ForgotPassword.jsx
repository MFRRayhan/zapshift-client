import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { resetPassword } = useAuth();

  const handleResetPassword = async (data) => {
    try {
      await resetPassword(data.email);

      Swal.fire({
        icon: "success",
        title: "Reset Email Sent",
        text: "Please check your email inbox and follow the password reset instructions.",
        confirmButtonColor: "#009966",
      });

      reset();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
        confirmButtonColor: "#d92243",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="w-full max-w-md space-y-5"
    >
      <fieldset className="fieldset">
        <div>
          <h2 className="text-4xl font-bold mb-2">Forgot Password</h2>

          <p className="text-gray-500">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        {/* Email */}
        <div className="mt-10">
          <label className="label mb-1">Email</label>

          <input
            {...register("email", { required: "E-mail is required" })}
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full focus:outline-none focus:border-primary"
          />

          {errors.email && (
            <p className="text-error mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Send Reset Link
        </button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </fieldset>
    </form>
  );
}
