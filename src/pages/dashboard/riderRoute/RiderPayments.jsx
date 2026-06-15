import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaSearch } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import moment from "moment";

export default function RiderPayments() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const {
    data = {
      parcels: [],
      totalPayments: 0,
    },
  } = useQuery({
    queryKey: ["riderPayments", user?.email, searchText, currentPage],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider-payments?riderEmail=${user?.email}&search=${searchText}&limit=${limit}&skip=${skip}`,
      );

      return res.data;
    },
  });

  const { parcels, totalPayments } = data;

  const totalPages = Math.ceil(totalPayments / limit);

  return (
    <section className="space-y-6">
      {/* HEADER (same as CompletedDeliveries) */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Rider Payments
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              View your earnings and payout history
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Payments</p>

            <h3 className="text-lg font-bold text-primary text-center">
              {totalPayments}
            </h3>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />

          <input
            type="search"
            placeholder="Search parcel, tracking id..."
            className="input input-bordered w-full pl-11 rounded-full focus:outline-none focus:border-primary"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {parcels.length === 0 ? (
        <section className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaBangladeshiTakaSign className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Payout Requests Yet
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              You haven't submitted any payout requests. Completed delivery
              payouts will appear here once requested.
            </p>
          </div>
        </section>
      ) : (
        <section className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-base-200 text-base-content/70">
                <tr>
                  <th>Index</th>
                  <th>Parcel</th>
                  <th>Receiver</th>
                  <th>Cost</th>
                  <th>Payout</th>
                  <th>Status</th>
                  <th>Paid At</th>
                  <th>Requested</th>
                </tr>
              </thead>

              <tbody>
                {parcels.map((p, i) => (
                  <tr
                    key={p._id}
                    className="
                      hover:bg-base-200/50
                      transition-all
                      duration-200
                      hover:shadow-sm
                    "
                  >
                    <td>{i + 1}</td>
                    {/* PARCEL */}
                    <td>
                      <div className="font-semibold">{p.parcelName}</div>
                      <div className="text-xs text-gray-500">
                        {p.trackingId}
                      </div>
                    </td>

                    {/* RECEIVER */}
                    <td>
                      <div className="font-medium">{p.receiverName}</div>
                      <div className="text-xs text-gray-500">
                        {p.receiverPhone}
                      </div>
                    </td>

                    {/* COST */}
                    <td className="font-semibold">
                      <div className="flex items-center gap-1">
                        <FaBangladeshiTakaSign /> {p.cost}
                      </div>
                    </td>

                    {/* PAYOUT */}
                    <td className="font-semibold text-primary">
                      <div className="flex items-center gap-1">
                        <FaBangladeshiTakaSign /> {p.payoutAmount}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`capitalize badge ${
                          p.payoutStatus === "requested"
                            ? "badge-warning"
                            : p.payoutStatus === "paid"
                              ? "badge-primary"
                              : "badge-neutral"
                        }`}
                      >
                        {p.payoutStatus}
                      </span>
                    </td>

                    {/* PAID AT */}
                    <td className="text-sm">
                      {p.paidAt
                        ? moment(p.paidAt).format("DD MMM YYYY")
                        : "N/A"}
                    </td>

                    {/* REQUESTED AT */}
                    <td className="text-sm">
                      {p.payoutRequestedAt
                        ? moment(p.payoutRequestedAt).format("DD MMM YYYY")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PAGINATION (same style as CompletedDeliveries) */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              className="btn btn-sm"
            >
              Prev
            </button>
          )}

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`btn btn-sm btn-square ${
                currentPage === page + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {page + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
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
