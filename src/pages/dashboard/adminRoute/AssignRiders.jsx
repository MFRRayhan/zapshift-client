import { useQuery } from "@tanstack/react-query";
import { FaMotorcycle, FaSearch, FaUserPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

export default function AssignRiders() {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const riderModalRef = useRef();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcelData = { parcels: [], totalParcels: 0 },
    refetch: parcelRefetch,
  } = useQuery({
    queryKey: ["riders", "pending-pickup", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending_pickup&search=${searchText}`,
      );
      return res.data;
    },
  });

  const { parcels } = parcelData;

  const {
    data: riderData = { riders: [], totalRiders: 0 },
    refetch: riderRefetch,
  } = useQuery({
    queryKey: ["riders", "available", selectedParcel?.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?district=${selectedParcel?.senderDistrict}&status=approved&workStatus=available`,
      );

      return res.data;
    },
  });
  const { riders } = riderData;

  const handleAssignRiderModal = (parcel) => {
    riderModalRef.current.showModal();
    setSelectedParcel(parcel);
  };

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.riderName,
      riderEmail: rider.riderEmail,
      phoneNumber: rider.phoneNumber,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId,
    };

    axiosSecure
      .patch(`/parcels/assign-rider/${selectedParcel._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data.parcelResult.modifiedCount > 0) {
          riderModalRef.current?.close();

          // setSelectedParcel(null);

          parcelRefetch();
          riderRefetch();

          Swal.fire({
            icon: "success",
            title: "Rider Assigned",
            text: `${rider.riderName} has been assigned successfully.`,
            confirmButtonColor: "#009966",
          });
        }
      })
      .catch((err) => {
        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Assignment Failed",
          text: "Something went wrong while assigning the rider.",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  // GET BADGE
  const getBadge = (status) => {
    switch (status) {
      case "parcel_created":
        return "badge-warning";

      case "not_collected":
        return "badge-warning";

      case "pending_pickup":
        return "badge-warning";

      case "driver_assigned":
        return "badge-warning";

      case "rider_accepted":
        return "badge-primary";

      case "picked_up":
        return "badge-info";

      case "in_transit":
        return "badge-secondary";

      case "delivered":
        return "badge-primary";

      case "driver_rejected":
        return "badge-warning";

      default:
        return "badge-neutral";
    }
  };

  // GET LABEL
  const getLabel = (status) => {
    switch (status) {
      case "parcel_created":
        return "Payment Pending";

      case "not_collected":
        return "Not Collected";

      case "pending_pickup":
        return "Pending Pickup";

      case "driver_assigned":
        return "Awaiting Driver Response";

      case "rider_accepted":
        return "Accepted";

      case "picked_up":
        return "Picked Up";

      case "in_transit":
        return "In Transit";

      case "delivered":
        return "Delivered";

      case "driver_rejected":
        return "Pending Pickup";

      default:
        return status;
    }
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
                        <span
                          className={`badge font-semibold ${getBadge(parcel.deliveryStatus)}`}
                        >
                          {getLabel(parcel.deliveryStatus)}
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
            <div className="modal-box relative">
              {/* Close Button */}
              <form method="dialog">
                <button className="btn btn-sm btn-square btn-error btn-outline absolute right-2 top-2">
                  <ImCross />
                </button>
              </form>

              <div className="overflow-x-auto mt-10">
                {/* Header */}
                <h3 className="text-2xl font-bold mb-4">
                  Riders Available: {riders.length}
                </h3>

                {/* EMPTY STATE */}
                {riders.length === 0 ? (
                  <div className="text-center py-10">
                    <FaMotorcycle className="text-5xl mx-auto text-base-content/40 mb-4" />

                    <p className="text-lg font-semibold text-base-content/70">
                      No riders available
                    </p>

                    <p className="text-sm text-base-content/50 mt-1">
                      No approved and available riders found in this district
                    </p>
                  </div>
                ) : (
                  /* RIDERS TABLE */
                  <table className="table table-zebra">
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
                )}
              </div>
            </div>
          </dialog>
        </>
      )}
    </section>
  );
}
