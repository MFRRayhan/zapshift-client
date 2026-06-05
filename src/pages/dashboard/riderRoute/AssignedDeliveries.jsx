import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaEye } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useRef, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function AssignedDeliveries() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user?.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=driver_assigned`,
      );
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl text-primary">Assigned Deliveries</h2>

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

                  <button className="btn btn-sm btn-square btn-primary btn-outline">
                    <FaCheck />
                  </button>

                  <button className="btn btn-sm btn-square btn-error btn-outline">
                    <ImCross />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
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
              <div className="w-full bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm space-y-6">
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
    </div>
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
