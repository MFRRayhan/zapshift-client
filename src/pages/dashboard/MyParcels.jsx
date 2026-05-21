import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  FaBoxOpen,
  FaEye,
  FaPen,
  FaTrash,
  FaBangladeshiTakaSign,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

export default function MyParcels() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleParcelDelete = (parcelId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#e5e7eb",
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
                confirmButtonColor: "#caeb66",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Failed to delete parcel",
              icon: "error",
              confirmButtonColor: "#caeb66",
            });
          });
      }
    });
  };

  if (isLoading) return <Loading />;

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
              {parcels.length}
            </h3>
          </div>
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
                      <p className="font-medium">{parcel.senderDistrict}</p>
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

                    {/* ACTIONS */}
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-square btn-ghost">
                          <FaEye />
                        </button>

                        <button className="btn btn-sm btn-square btn-ghost">
                          <FaPen />
                        </button>

                        <button
                          onClick={() => handleParcelDelete(parcel._id)}
                          className="btn btn-sm btn-square btn-error btn-outline"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
