import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaMotorcycle,
} from "react-icons/fa";

import useAxios from "../hooks/useAxios";
import StatusBadge from "../components/StatusBadge";

export default function ParcelTrackDetails() {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data = { parcel: {}, history: [] }, isLoading } = useQuery({
    queryKey: ["parcel-track", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/parcel-track/${trackingId}`);
      return res.data;
    },
  });

  const { parcel, history } = data;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="loading loading-spinner loading-md"></span>
          <span>Loading parcel tracking information...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          {/* PAGE HEADER */}
          <div>
            <h2 className="text-4xl font-bold">Parcel Tracking Details</h2>

            <p className="text-gray-500 mt-2">
              Tracking ID:{" "}
              <span className="text-primary font-semibold">{trackingId}</span>
            </p>
          </div>

          {/* PARCEL DETAILS CARD */}
          <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm overflow-hidden">
            {/* HEADER */}
            <div className="p-6 border-b border-base-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <FaBox className="text-primary" />
                    {parcel?.parcelName}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Shipment Information & Delivery Status
                  </p>
                </div>

                <StatusBadge status={parcel.deliveryStatus} />
              </div>
            </div>

            {/* PARCEL INFO */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* LEFT */}
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-4">
                  <FaTruck className="text-primary" />
                  Parcel Information
                </h4>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">Parcel Type:</span>{" "}
                    <span className="capitalize">
                      {parcel?.parcelType || "N/A"}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Weight:</span>{" "}
                    {parcel?.parcelWeight || 0} KG
                  </p>

                  <p>
                    <span className="font-semibold">Delivery Cost:</span>{" "}
                    <span className="text-primary font-semibold">
                      ৳{parcel?.cost || 0}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Tracking ID:</span>{" "}
                    {parcel?.trackingId}
                  </p>

                  <p>
                    <span className="font-semibold">Created At:</span>{" "}
                    {parcel?.createdAt
                      ? moment(parcel.createdAt).format("DD MMM YYYY, hh:mm A")
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-4">
                  <FaMoneyBillWave className="text-primary" />
                  Payment Information
                </h4>

                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-semibold">Payment Status:</span>{" "}
                    <span
                      className={`badge capitalize ${
                        parcel?.paymentStatus === "paid"
                          ? "badge-primary"
                          : "badge-warning"
                      }`}
                    >
                      {parcel?.paymentStatus || "Unpaid"}
                    </span>
                  </p>

                  {parcel?.paidAt && (
                    <p>
                      <span className="font-semibold">Paid At:</span>{" "}
                      {moment(parcel.paidAt).format("DD MMM YYYY, hh:mm A")}
                    </p>
                  )}

                  <p>
                    <span className="font-semibold">Pickup Instructions:</span>{" "}
                    {parcel?.pickupInstructions || "N/A"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Delivery Instructions:
                    </span>{" "}
                    {parcel?.deliveryInstructions || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* SENDER / RECEIVER */}
            <div className="border-t border-base-300 p-6 grid md:grid-cols-2 gap-6">
              {/* SENDER */}
              <div className="bg-base-200 rounded-2xl p-5">
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-4">
                  <FaUser className="text-primary" />
                  Sender Information
                </h4>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {parcel?.senderName}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {parcel?.senderEmail}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {parcel?.senderPhone}
                  </p>

                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {parcel?.senderRegion}
                  </p>

                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {parcel?.senderDistrict}
                  </p>

                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {parcel?.senderAddress}
                  </p>
                </div>
              </div>

              {/* RECEIVER */}
              <div className="bg-base-200 rounded-2xl p-5">
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-4">
                  <FaMapMarkerAlt className="text-primary" />
                  Receiver Information
                </h4>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {parcel?.receiverName}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {parcel?.receiverEmail}
                  </p>

                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {parcel?.receiverPhone}
                  </p>

                  <p>
                    <span className="font-semibold">Region:</span>{" "}
                    {parcel?.receiverRegion}
                  </p>

                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {parcel?.receiverDistrict}
                  </p>

                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {parcel?.receiverAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* RIDER INFO */}
            {(parcel?.riderName || parcel?.riderEmail) && (
              <div className="border-t border-base-300 p-6">
                <h4 className="font-semibold text-primary flex items-center gap-2 mb-4">
                  <FaMotorcycle className="text-primary" />
                  Assigned Rider
                </h4>

                <div className="bg-base-200 rounded-2xl p-5 text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Rider Name:</span>{" "}
                    {parcel?.riderName}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {parcel?.riderEmail}
                  </p>

                  <p>
                    <span className="font-semibold">Rider ID:</span>{" "}
                    {parcel?.riderId}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden h-full lg:flex justify-center">
          {/* TRACKING TIMELINE */}
          <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Tracking History</h3>

            {history.length === 0 ? (
              <p className="text-gray-500">No tracking history available.</p>
            ) : (
              <ul className="timeline timeline-vertical">
                {history.map((log) => (
                  <li key={log._id}>
                    <div className="timeline-start text-xs text-gray-500">
                      {moment(log.createdAt).format("DD MMM YYYY, hh:mm A")}
                    </div>

                    <div className="timeline-middle">
                      <FaCheckCircle className="text-primary" />
                    </div>

                    <div className="timeline-end timeline-box bg-base-100 border border-base-300 capitalize">
                      <p className="font-semibold text-primary">
                        {log.details}
                      </p>
                    </div>

                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
