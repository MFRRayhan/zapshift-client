// PaymentCancel.jsx
import { FaCircleXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-5xl bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <FaCircleXmark className="text-5xl text-red-400/80" />
          </div>
          <h1 className="text-2xl font-bold text-base-content">
            Payment Cancelled
          </h1>
          <p className="text-sm text-base-content/60">
            Your transaction was not completed. No amount has been charged.
          </p>
        </div>

        {/* INFO CARD */}
        <div className="p-5 rounded-xl border border-base-300 bg-base-200/30 space-y-3">
          <h2 className="font-semibold text-base-content mb-2">
            What happened?
          </h2>

          <p className="text-sm text-base-content/70 leading-relaxed">
            The payment process was interrupted or cancelled before completion.
            You can try again or return to your dashboard to continue managing
            your parcels.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between border-t border-base-300 pt-5">
          <Link to={"/dashboard"}>
            <button className="btn btn-outline rounded-xl">
              Back to Dashboard
            </button>
          </Link>

          <Link to={"/dashboard/my-parcels"}>
            <button className="btn rounded-xl bg-red-400/80 text-white border-none hover:bg-red-300">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
