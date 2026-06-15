import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function Payment() {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels/${parcelId}`);
      return data;
    },
    enabled: !!parcelId,
  });

  if (isLoading) return <Loading />;

  if (!parcel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-base-content/60 bg-base-100">
        Parcel not found
      </div>
    );
  }

  const handlePayment = async () => {
    const parcelInfo = {
      parcelName: parcel.parcelName,
      parcelId: parcel?._id,
      senderEmail: parcel.senderEmail,
      cost: parcel.cost,
      trackingId: parcel.trackingId,
    };

    const res = await axiosSecure.post("/create-checkout-session", parcelInfo);

    window.location.assign(res.data.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 rounded-2xl">
      <div className="w-full max-w-5xl bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-base-content">
            Payment Summary
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Review sender, receiver and parcel details before payment
          </p>
        </div>

        {/* PARCEL INFO */}
        <div className="p-5 rounded-xl border border-base-300 bg-base-200/30">
          <h2 className="font-semibold text-base-content mb-4">
            Parcel Information
          </h2>

          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-base-content/60">Parcel Name</p>
              <p className="font-medium text-base-content">
                {parcel.parcelName}
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/60">Type</p>
              <p className="font-medium capitalize text-base-content">
                {parcel.parcelType}
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/60">Weight</p>
              <p className="font-medium text-base-content">
                {parcel.parcelWeight} kg
              </p>
            </div>

            <div>
              <p className="text-xs text-base-content/60">Tracking ID</p>
              <p className="font-medium text-base-content">
                {parcel.trackingId}
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

            <Info label="Name" value={parcel.senderName} />
            <Info label="Email" value={parcel.senderEmail} />
            <Info label="Phone" value={parcel.senderPhone} />
            <Info label="Address" value={parcel.senderAddress} />
            <Info label="Region" value={parcel.senderRegion} />
            <Info label="District" value={parcel.senderDistrict} />
          </div>

          {/* RECEIVER */}
          <div className="p-5 rounded-xl border border-base-300 bg-base-200/30 space-y-3">
            <h3 className="font-semibold text-base-content">
              Receiver Information
            </h3>

            <Info label="Name" value={parcel.receiverName} />
            <Info label="Email" value={parcel.receiverEmail} />
            <Info label="Phone" value={parcel.receiverPhone} />
            <Info label="Address" value={parcel.receiverAddress} />
            <Info label="Region" value={parcel.receiverRegion} />
            <Info label="District" value={parcel.receiverDistrict} />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-base-300 pt-5">
          {/* COST */}
          <div>
            <p className="text-sm text-base-content/60">Total Cost</p>
            <p className="text-2xl font-bold text-primary flex items-center gap-1">
              <FaBangladeshiTakaSign />
              {parcel.cost}
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={handlePayment}
            className="btn btn-primary rounded-xl"
          >
            Pay Now
          </button>
        </div>
      </div>
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
