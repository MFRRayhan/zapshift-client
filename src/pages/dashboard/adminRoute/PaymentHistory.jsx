import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaCreditCard } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

export default function ParcelPaymentHistory() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * limit;
  const [searchText, setSearchText] = useState("");

  const { data = { payments: [], totalPayments: 0 } } = useQuery({
    queryKey: ["payments", currentPage, searchText],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/admin/payments?&limit=${limit}&skip=${skip}&search=${searchText}`,
      );
      return data;
    },
  });

  const { payments, totalPayments } = data;
  const totalPages = Math.ceil(totalPayments / limit);

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

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            placeholder="Type to search..."
            className="input input-bordered w-full pl-11 focus:outline-none focus:border-primary rounded-full"
          />
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
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="btn btn-sm"
            >
              Prev
            </button>
          )}
          {[
            ...Array(totalPages)
              .keys()
              .map((page) => (
                <button
                  onClick={() => setCurrentPage(page + 1)}
                  key={page}
                  className={`btn btn-sm ${currentPage === page + 1 ? "btn-primary" : "btn-outline"}`}
                >
                  {page + 1}
                </button>
              )),
          ]}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="btn btn-sm"
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
}
