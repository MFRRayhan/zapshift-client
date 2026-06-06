import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaCheck, FaSearch } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function CompletedDeliveries() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 20;
  const skip = (currentPage - 1) * limit;

  const {
    data = {
      parcels: [],
      totalAssignedDeliveries: 0,
    },
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email, searchText, currentPage],

    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivered&search=${searchText}&limit=${limit}&skip=${skip}`,
      );

      return res.data;
    },
  });

  const { parcels, totalAssignedDeliveries } = data;

  const totalPages = Math.ceil(totalAssignedDeliveries / limit);

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return (parcel.cost * 0.7).toFixed(2);
    }

    return (parcel.cost * 0.8).toFixed(2);
  };

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Completed Deliveries
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              View and manage all successfully delivered parcels
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Deliveries</p>

            <h3 className="text-lg font-bold text-primary text-center">
              {totalAssignedDeliveries}
            </h3>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />

          <input
            type="search"
            placeholder="Type to search..."
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
              <FaCheck className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Deliveries Found
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              You don’t have any completed deliveries yet.
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
                  <th>Type</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Cost</th>
                  <th>Payout</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id}
                    className="
                      hover:bg-base-200/50
                      transition-all
                      duration-200
                      hover:shadow-sm
                    "
                  >
                    <td className="font-medium text-base-content/70">
                      {skip + index + 1}
                    </td>

                    <td>
                      <div>
                        <p className="font-semibold">{parcel.parcelName}</p>

                        <p className="text-xs text-base-content/60">
                          {parcel.parcelWeight || 0} KG
                        </p>
                      </div>
                    </td>

                    <td>{parcel.parcelType}</td>

                    <td>{parcel.senderName}</td>

                    <td>{parcel.receiverName}</td>

                    <td>{parcel.senderDistrict}</td>

                    <td>{parcel.receiverDistrict}</td>

                    <td>
                      <div className="flex items-center gap-1 font-bold">
                        <FaBangladeshiTakaSign className="text-primary" />
                        {parcel.cost}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-1 font-bold">
                        <FaBangladeshiTakaSign className="text-primary" />
                        {calculatePayout(parcel)}
                      </div>
                    </td>

                    <td>
                      <button className="btn btn-primary btn-sm">
                        Payout{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PAGINATION */}
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
