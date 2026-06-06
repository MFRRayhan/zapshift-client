import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBangladeshiTakaSign,
  FaBoxOpen,
  FaEye,
  FaPen,
  FaTrash,
} from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";

export default function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const modalRef = useRef(null);
  const patchModalRef = useRef(null);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [patchParcel, setPatchParcel] = useState(null);
  const [searchText, setSearchText] = useState("");
  const limit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * limit;

  const { data = { parcels: [], totalParcels: 0 }, refetch } = useQuery({
    queryKey: ["myParcels", user?.email, searchText, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${user?.email}&search=${searchText}&limit=${limit}&skip=${skip}`,
      );
      return res.data;
    },
  });

  const { parcels, totalParcels } = data;
  const totalPages = Math.ceil(totalParcels / limit);

  const openParcelModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current?.showModal();
  };

  const handlePatchParcelForm = (data) => {
    if (!patchParcel?._id) return;

    axiosSecure
      .patch(`/parcels/${patchParcel?._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();

          patchModalRef.current?.close();

          Swal.fire({
            icon: "success",
            title: "Parcel Updated",
            text: "Receiver information updated successfully.",
            confirmButtonColor: "#009966",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong.",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  const handlePatchParcel = (parcel) => {
    setPatchParcel(parcel);

    reset({
      receiverName: parcel?.receiverName || "",
      receiverPhone: parcel?.receiverPhone || "",
      receiverEmail: parcel?.receiverEmail || "",
      receiverAddress: parcel?.receiverAddress || "",
      receiverDistrict: parcel?.receiverDistrict || "",
      deliveryInstructions: parcel?.deliveryInstructions || "",
    });

    patchModalRef.current?.showModal();
  };

  const handleParcelDelete = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009966",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/parcels/${parcelId}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();

              Swal.fire({
                title: "Deleted",
                text: "Parcel removed successfully",
                icon: "success",
                confirmButtonColor: "#009966",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete parcel",
              icon: "error",
              confirmButtonColor: "#009966",
            });
          });
      }
    });
  };

  // GET BADGE
  const getBadge = (status) => {
    switch (status) {
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

  const lockedStatuses = [
    "rider_accepted",
    "picked_up",
    "in_transit",
    "delivered",
  ];

  const isLocked = (status) => {
    return lockedStatuses.includes(status);
  };

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">My Parcels</h2>

            <p className="text-sm text-base-content/60 mt-1">
              Manage and track all your parcel deliveries
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Parcels</p>

            <h3 className="text-lg font-bold text-primary text-center">
              {totalParcels}
            </h3>
          </div>
        </div>
      </div>

      {/* search */}
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
      {parcels.length === 0 ? (
        <section className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaBoxOpen className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Parcels Found
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              You haven’t created any parcel yet. Start sending parcels and
              manage all your deliveries from this dashboard.
            </p>

            <Link to="/send-parcel">
              <button className="btn btn-primary mt-6 rounded-xl">
                Send Your First Parcel
              </button>
            </Link>
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
                  <th>Parcel</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Route</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>Delivery Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {parcels.map((parcel, index) => (
                  <tr
                    key={parcel._id}
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

                    {/* PARCEL */}
                    <td>
                      <div>
                        <p className="font-semibold">{parcel.parcelName}</p>

                        <p className="text-xs text-base-content/60">
                          {parcel.parcelWeight} KG
                        </p>
                      </div>
                    </td>

                    {/* SENDER */}
                    <td>
                      <p className="font-medium">{parcel.senderName}</p>
                    </td>

                    {/* RECEIVER */}
                    <td>
                      <div>
                        <p className="font-medium">{parcel.receiverName}</p>

                        <p className="text-xs text-base-content/60">
                          {parcel.receiverPhone}
                        </p>
                      </div>
                    </td>

                    {/* ROUTE */}
                    <td className="text-xs text-base-content/70">
                      {parcel.senderDistrict} → {parcel.receiverDistrict}
                    </td>

                    {/* COST */}
                    <td>
                      <div className="flex items-center gap-1 font-bold">
                        <FaBangladeshiTakaSign className="text-primary" />
                        {parcel.cost}
                      </div>
                    </td>

                    {/* PAYMENT */}
                    <td>
                      {parcel.paymentStatus === "unpaid" ? (
                        <Link to={`/dashboard/payments/${parcel._id}`}>
                          <button className="btn btn-primary btn-sm rounded-lg">
                            Pay Now
                          </button>
                        </Link>
                      ) : (
                        <span className="badge badge-success badge-outline font-semibold">
                          Paid
                        </span>
                      )}
                    </td>

                    {/* DELIVERY STATUS */}
                    <td>
                      <span
                        className={`badge ${getBadge(parcel.deliveryStatus)}`}
                      >
                        {getLabel(parcel.deliveryStatus)}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openParcelModal(parcel)}
                          className="btn btn-sm btn-square btn-ghost btn-outline"
                        >
                          <FaEye />
                        </button>

                        {!isLocked(parcel.deliveryStatus) && (
                          <>
                            <button
                              onClick={() => handlePatchParcel(parcel)}
                              className="btn btn-sm btn-square btn-ghost btn-outline"
                            >
                              <FaPen />
                            </button>

                            <button
                              onClick={() => handleParcelDelete(parcel._id)}
                              className="btn btn-sm btn-square btn-error btn-outline"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PAGINATION BTN */}
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
                  className={`btn btn-sm btn-square ${currentPage === page + 1 ? "btn-primary" : "btn-outline"}`}
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

      {/* DETAILS MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-4xl rounded-2xl p-0">
          {/* HEADER */}
          <div className="bg-base-200 px-6 py-5 flex items-center justify-between border-b border-base-300">
            <div>
              <h3 className="text-xl font-bold text-base-content">
                Parcel Details
              </h3>

              <p className="text-sm text-base-content/60 mt-1">
                Complete information about this parcel delivery
              </p>
            </div>

            <form method="dialog">
              <button className="btn btn-sm btn-square btn-error btn-outline">
                <ImCross />
              </button>
            </form>
          </div>

          {/* BODY */}
          {selectedParcel && (
            <div className="p-6 space-y-6">
              {/* TOP STATUS */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedParcel.parcelName}
                  </h2>

                  <p className="text-sm text-base-content/60 mt-1">
                    Tracking ID: {selectedParcel._id}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span
                    className={`badge badge-lg capitalize ${
                      selectedParcel.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {selectedParcel.paymentStatus}
                  </span>

                  <span className="badge badge-primary badge-lg capitalize">
                    {selectedParcel.deliveryStatus || "Pending"}
                  </span>
                </div>
              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sender */}
                <div className="bg-base-200 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-base">Sender Information</h4>

                  <div>
                    <p className="text-xs text-base-content/60">Sender Name</p>

                    <p className="font-medium">{selectedParcel.senderName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Sender Contact
                    </p>

                    <p className="font-medium">{selectedParcel.senderPhone}</p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Pickup District
                    </p>

                    <p className="font-medium">
                      {selectedParcel.senderDistrict}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Pickup Address
                    </p>

                    <p className="font-medium">
                      {selectedParcel.senderAddress}
                    </p>
                  </div>
                </div>

                {/* Receiver */}
                <div className="bg-base-200 rounded-2xl p-5 space-y-3">
                  <h4 className="font-bold text-base">Receiver Information</h4>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Receiver Name
                    </p>

                    <p className="font-medium">{selectedParcel.receiverName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Receiver Contact
                    </p>

                    <p className="font-medium">
                      {selectedParcel.receiverPhone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Delivery District
                    </p>

                    <p className="font-medium">
                      {selectedParcel.receiverDistrict}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Delivery Address
                    </p>

                    <p className="font-medium">
                      {selectedParcel.receiverAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* PARCEL INFO */}
              <div className="bg-base-200 rounded-2xl p-5">
                <h4 className="font-bold text-base mb-4">Parcel Information</h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-base-content/60">Parcel Type</p>

                    <p className="font-medium">{selectedParcel.type}</p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Parcel Weight
                    </p>

                    <p className="font-medium">
                      {selectedParcel.parcelWeight} KG
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-base-content/60">
                      Delivery Cost
                    </p>

                    <div className="flex items-center gap-1 font-bold text-primary">
                      <FaBangladeshiTakaSign />
                      {selectedParcel.cost}
                    </div>
                  </div>
                </div>
              </div>

              {/* DELIVERY INSTRUCTIONS */}
              <div className="bg-base-200 rounded-2xl p-5">
                <h4 className="font-bold text-base mb-2">
                  Delivery Instructions
                </h4>

                <p className="text-sm leading-relaxed text-base-content/80">
                  {selectedParcel.deliveryInstruction ||
                    "No special delivery instructions provided."}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-base-content/50 border-t border-base-300 pt-4">
                <span>
                  Created At:{" "}
                  {new Date(
                    selectedParcel.creation_date || selectedParcel.createdAt,
                  ).toLocaleString()}
                </span>

                <span>Parcel ID: {selectedParcel._id}</span>
              </div>
            </div>
          )}
        </div>

        {/* BACKDROP */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* PARCEL EDIT MODAL */}

      <dialog ref={patchModalRef} className="modal">
        <div className="modal-box">
          <h2>Update parcel information</h2>
          <form method="dialog">
            <button className="btn btn-sm btn-square btn-error btn-outline absolute right-2 top-2">
              <ImCross />
            </button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(handlePatchParcelForm)(e);
            }}
            className="p-6 space-y-6"
          >
            {/* RECEIVER INFO SECTION */}
            <div className="bg-base-200 rounded-2xl p-5 space-y-4">
              <h4 className="font-bold text-base">Receiver Information</h4>

              {/* NAME */}
              <div>
                <label className="text-xs text-base-content/60">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("receiverName")}
                  className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
                  placeholder="Enter receiver name"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-xs text-base-content/60">
                  Receiver Phone
                </label>
                <input
                  type="text"
                  {...register("receiverPhone")}
                  className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
                  placeholder="Enter receiver phone"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-xs text-base-content/60">
                  Receiver Email
                </label>
                <input
                  type="email"
                  {...register("receiverEmail")}
                  className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
                  placeholder="Enter receiver email"
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="text-xs text-base-content/60">
                  Delivery Address
                </label>
                <input
                  type="text"
                  {...register("receiverAddress")}
                  className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
                  placeholder="Enter delivery address"
                />
              </div>

              {/* DISTRICT */}
              <div>
                <label className="text-xs text-base-content/60">
                  Delivery District
                </label>
                <input
                  type="text"
                  {...register("receiverDistrict")}
                  className="input input-bordered w-full mt-1 focus:outline-none focus:border-primary"
                  placeholder="Enter delivery district"
                />
              </div>
            </div>

            {/* DELIVERY INSTRUCTIONS */}
            <div className="bg-base-200 rounded-2xl p-5">
              <label className="text-xs text-base-content/60">
                Delivery Instructions
              </label>

              <textarea
                {...register("deliveryInstructions")}
                className="textarea textarea-bordered w-full mt-2 focus:outline-none focus:border-primary"
                placeholder="Any special instructions..."
              />
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 border-t border-base-300 pt-4">
              <button
                type="button"
                onClick={() => patchModalRef.current?.close()}
                className="btn btn-outline"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Update Parcel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </section>
  );
}
