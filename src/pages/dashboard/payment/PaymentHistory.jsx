import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaCreditCard } from "react-icons/fa6";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function PaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments?email=${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Payment History
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              View and manage all your completed billing transactions
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Transactions</p>
            <h3 className="text-lg font-bold text-primary text-center">
              {payments.length}
            </h3>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {payments.length === 0 ? (
        <section className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaCreditCard className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Payment Records
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              You haven't made any payments yet. Once you complete a parcel
              payment, the history will appear here.
            </p>
          </div>
        </section>
      ) : (
        /* TABLE */
        <section className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              {/* HEADER */}
              <thead className="bg-base-200 text-base-content/70">
                <tr>
                  <th>Index</th>
                  <th>Parcel Name</th>
                  <th>Transaction ID</th>
                  <th>Tracking ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="
                      hover:bg-base-200/50
                      transition-all
                      duration-200
                      hover:shadow-sm
                      cursor-default
                    "
                  >
                    {/* INDEX */}
                    <td className="font-medium text-base-content/70">
                      {index + 1}
                    </td>

                    {/* PARCEL NAME */}
                    <td>
                      <p className="font-semibold">{payment.parcelName}</p>
                    </td>

                    {/* TRANSACTION ID */}
                    <td className="font-mono text-xs text-primary font-semibold">
                      {payment.transactionId}
                    </td>

                    {/* TRACKING ID */}
                    <td className="font-mono text-xs text-base-content/80 font-medium">
                      {payment.trackingId}
                    </td>

                    {/* AMOUNT */}
                    <td>
                      <div className="flex items-center gap-1 font-bold">
                        <FaBangladeshiTakaSign className="text-primary" />
                        {payment.amount}
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="text-xs text-base-content/70">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span className="badge badge-success badge-outline gap-1 font-semibold py-3 px-3">
                        <FaCheckCircle className="text-xs" />
                        Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </section>
  );
}
