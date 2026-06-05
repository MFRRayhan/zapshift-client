import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaEye, FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useRef, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function AssignedDeliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const [selectedParcel, setSelectedParcel] = useState(null);

  const [searchText, setSearchText] = useState("");
  const limit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * limit;

  const { data = { parcels: [], totalAssingedDeliveries: 0 }, refetch } =
    useQuery({
      queryKey: [
        "parcels",
        user?.email,
        "driver_assigned",
        searchText,
        currentPage,
      ],
      enabled: !!user?.email,
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned&search=${searchText}&limit=${limit}&skip=${skip}`,
        );
        return res.data;
      },
    });

  const { parcels, totalAssingedDeliveries } = data;
  const totalPages = Math.ceil(totalAssingedDeliveries / limit);

  const handleAcceptedDelivery = (parcel) => {
    const statusInfo = {
      deliveryStatus: "rider_accepted",
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Rider accepted",
            text: "Rider accept the parcel request.",
            confirmButtonColor: "#009966",
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const handleRejectedDelivery = (parcel) => {
    const statusInfo = {
      deliveryStatus: "driver_rejected",
    };

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            icon: "success",
            title: "Delivery Rejected",
            text: "Parcel request has been rejected successfully.",
            confirmButtonColor: "#dc2626",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong while rejecting.",
          confirmButtonColor: "#dc2626",
        });
        console.error(err);
      });
  };

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Assigned Deliveries
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Manage your assigned delivery tasks
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Parcels</p>
            <h3 className="text-lg font-bold text-primary text-center">
              {totalAssingedDeliveries}
            </h3>
          </div>
        </div>
      </div>

      {/* SEARCH  */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />
          <input
            onChange={(e) => {
              setSearchText(e.target.value);
              setCurrentPage(1);
            }}
            type="search"
            placeholder="Type to search..."
            className="input input-bordered w-full pl-11 focus:outline-none focus:border-primary rounded-full"
          />
        </div>
      </div>

      {/* EMPTY STATE  */}
      {parcels.length === 0 ? (
        <section className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaCheck className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Parcels Found
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              You don’t have any assigned deliveries at the moment.
            </p>
          </div>
        </section>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Parcel</th>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, i) => (
                <tr key={parcel._id}>
                  <td>{i + 1}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.senderDistrict}</td>
                  <td>{parcel.receiverDistrict}</td>

                  <td className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedParcel(parcel);
                        modalRef.current.showModal();
                      }}
                      className="btn btn-sm btn-square btn-outline"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => handleAcceptedDelivery(parcel)}
                      className="btn btn-sm btn-square btn-primary btn-outline"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => handleRejectedDelivery(parcel)}
                      className="btn btn-sm btn-square btn-error btn-outline"
                    >
                      <ImCross />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION  */}
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

      {/* MODAL (UNCHANGED AS REQUESTED) */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-5xl">
          <form method="dialog">
            <button
              onClick={() => setSelectedParcel(null)}
              className="btn btn-sm btn-square btn-error btn-outline absolute right-2 top-2"
            >
              <ImCross />
            </button>
          </form>

          {selectedParcel && (
            <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 rounded-2xl">
              <div className="w-full bg-base-100 rounded-2xl p-6 space-y-6">
                {/* HEADER */}
                <div>
                  <h1 className="text-2xl font-bold text-base-content">
                    Parcel Details
                  </h1>
                  <p className="text-sm text-base-content/60 mt-1">
                    Full sender, receiver and parcel information
                  </p>
                </div>

                {/* PARCEL INFO */}
                <div className="p-5 rounded-xl border border-base-300 bg-base-200/30">
                  <h2 className="font-semibold text-base-content mb-4">
                    Parcel Information
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-base-content/60">
                        Parcel Name
                      </p>
                      <p className="font-medium text-base-content">
                        {selectedParcel.parcelName}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-base-content/60">Type</p>
                      <p className="font-medium capitalize text-base-content">
                        {selectedParcel.parcelType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-base-content/60">Weight</p>
                      <p className="font-medium text-base-content">
                        {selectedParcel.parcelWeight} kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* SENDER + RECEIVER */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* SENDER */}
                  <div className="p-5 rounded-xl border border-base-300 bg-base-200/30 space-y-3">
                    <h3 className="font-semibold text-base-content">
                      Sender Information
                    </h3>

                    <Info label="Name" value={selectedParcel.senderName} />
                    <Info label="Email" value={selectedParcel.senderEmail} />
                    <Info label="Phone" value={selectedParcel.senderPhone} />
                    <Info
                      label="Address"
                      value={selectedParcel.senderAddress}
                    />
                    <Info label="Region" value={selectedParcel.senderRegion} />
                    <Info
                      label="District"
                      value={selectedParcel.senderDistrict}
                    />
                  </div>

                  {/* RECEIVER */}
                  <div className="p-5 rounded-xl border border-base-300 bg-base-200/30 space-y-3">
                    <h3 className="font-semibold text-base-content">
                      Receiver Information
                    </h3>

                    <Info label="Name" value={selectedParcel.receiverName} />
                    <Info label="Email" value={selectedParcel.receiverEmail} />
                    <Info label="Phone" value={selectedParcel.receiverPhone} />
                    <Info
                      label="Address"
                      value={selectedParcel.receiverAddress}
                    />
                    <Info
                      label="Region"
                      value={selectedParcel.receiverRegion}
                    />
                    <Info
                      label="District"
                      value={selectedParcel.receiverDistrict}
                    />
                  </div>
                </div>

                {/* COST */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-base-300 pt-5">
                  <div>
                    <p className="text-sm text-base-content/60">Total Cost</p>
                    <p className="text-2xl font-bold text-primary flex items-center gap-1">
                      <FaBangladeshiTakaSign /> {selectedParcel.cost}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </section>
  );
}

/* ================= Helper ================= */
function Info({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-base-content/60">{label}</span>
      <span className="text-base-content font-medium">{value}</span>
    </div>
  );
}
