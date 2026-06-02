import { FaBangladeshiTakaSign, FaCircleCheck } from "react-icons/fa6";
import { Link, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const { data: paymentInfo = {} } = useQuery({
    queryKey: ["payment-success", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.patch(
        `/payment-success?session_id=${sessionId}`,
      );
      return res.data.payment;
    },
    enabled: !!sessionId,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-5xl bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <FaCircleCheck className="text-5xl text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-base-content">
            Payment Successful
          </h1>
          <p className="text-sm text-base-content/60">
            Your transaction has been completed successfully
          </p>
        </div>

        {/* STATUS CARD */}
        <div className="p-5 rounded-xl border border-base-300 bg-base-200/30 space-y-3">
          <h2 className="font-semibold text-base-content mb-2">
            Payment Details
          </h2>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Transaction ID:</span>
            <span className="text-primary font-semibold">
              {paymentInfo?.transactionId}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Tracking ID:</span>
            <span className="text-primary font-medium">
              {paymentInfo?.trackingId}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Payment Amount:</span>
            <span className="text-base-content font-medium flex items-center gap-1">
              <FaBangladeshiTakaSign className="text-primary" />{" "}
              {paymentInfo?.amount}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Sender E-mail:</span>
            <span className="text-base-content font-medium">
              {paymentInfo?.customerEmail}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Parcel Name:</span>
            <span className="text-base-content font-medium">
              {paymentInfo?.parcelName}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row gap-4 md:justify-between border-t border-base-300 pt-5">
          <Link to={"/dashboard"}>
            <button className="btn btn-outline rounded-xl">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
