import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaMotorcycle,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

export default function AssignRiders() {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcelData = { parcels: [], totalParcels: 0 } } = useQuery({
    queryKey: ["riders", "pending-pickup", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending_pickup&search=${searchText}`,
      );
      return res.data;
    },
  });

  const { parcels, totalParcels } = parcelData;

  const { data: riderData = { riders: [], totalRiders: 0 } } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?district=${selectedParcel?.senderDistrict}&status=approved&workStatus=available`,
      );

      return res.data;
    },
  });
  const { riders, totalRiders } = riderData;

  const handleAssignRiderModal = (parcel) => {
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  const handleAssignRider = (rider) => {
    console.log(rider);
    const riderInfo = {
      riderId: rider._id,
      riderName,
      riderEmail,
      phoneNumber,
      parcelId: selectedParcel._id,
    };

    axiosSecure.patch(``, riderInfo);
  };

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
        <>
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
                    <th>Pickup District</th>
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

                      <td className="capitalize">{parcel.senderDistrict}</td>

                      <td>
                        <button
                          onClick={() => handleAssignRiderModal(parcel)}
                          className="btn btn-primary btn-sm rounded-xl"
                        >
                          <FaUserPlus />
                          Find Rider
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <dialog ref={riderModalRef} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-square btn-error btn-outline absolute right-2 top-2">
                  <ImCross />
                </button>
              </form>
              <div className="overflow-x-auto mt-10">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Index</th>
                      <th>Rider Name</th>
                      <th>Rider Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riders.map((rider, i) => (
                      <tr key={rider._id}>
                        <th>{i + 1}</th>
                        <td>{rider.riderName}</td>
                        <td>{rider.riderEmail}</td>
                        <td>
                          <button
                            onClick={() => handleAssignRider(rider)}
                            className="btn btn-primary btn-sm"
                          >
                            Assign Rider
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </dialog>
        </>
      )}
    </section>
  );
}
