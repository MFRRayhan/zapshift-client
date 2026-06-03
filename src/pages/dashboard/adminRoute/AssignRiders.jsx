import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaMotorcycle,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function AssignRiders() {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { data = { parcels: [], totalParcels: 0 } } = useQuery({
    queryKey: ["riders", "pending-pickup", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending_pickup&search=${searchText}`,
      );
      return res.data;
    },
  });

  const { parcels, totalParcels } = data;

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Assign Riders
            </h2>

            <p className="text-sm text-base-content/60 mt-1">
              Manage pending pickup parcels and assign riders
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Pending Pickups</p>

            <h3 className="text-lg font-bold text-primary text-center">
              {parcels.length}
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
            placeholder="Search parcel..."
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full pl-11 rounded-full"
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {parcels.length === 0 ? (
        <section className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaMotorcycle className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Pending Parcels
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              All pickup requests have already been assigned to riders.
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
                  <th>Tracking ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Action</th>
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
                    "
                  >
                    <td>{index + 1}</td>

                    <td>
                      <p className="font-semibold">{parcel.parcelName}</p>
                    </td>

                    <td className="font-mono text-xs text-primary font-semibold">
                      {parcel.trackingId}
                    </td>

                    <td>{parcel.senderName}</td>

                    <td>{parcel.receiverName}</td>

                    <td className="font-bold">
                      <div className="flex items-center gap-1">
                        <FaBangladeshiTakaSign className="text-primary" />
                        {parcel.cost}
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-warning badge-outline gap-1">
                        <FaCheckCircle />
                        Pending Pickup
                      </span>
                    </td>

                    <td>
                      <button className="btn btn-primary btn-sm rounded-xl">
                        <FaUserPlus />
                        Assign Rider
                      </button>
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
