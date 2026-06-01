import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaCheck, FaEye, FaSearch, FaTrash } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function RiderApplications() {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedRider, setSelectedRider] = useState(null);
  const [searchText, setSearch] = useState("");
  const limit = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const skip = (currentPage - 1) * limit;

  const { data = { riders: [], totalRiders: 0 }, refetch } = useQuery({
    queryKey: ["riders", searchText, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?search=${searchText}&limit=${limit}&skip=${skip}`,
      );
      return res.data;
    },
  });
  const { riders, totalRiders } = data;
  const totalPages = Math.ceil(totalRiders / limit);

  const openModal = (rider) => {
    setSelectedRider(rider);
    modalRef.current?.showModal();
  };

  const updateRiderStatus = (rider, status) => {
    axiosSecure
      .patch(`/riders/${rider._id}`, {
        status,
        email: rider.riderEmail,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();

          Swal.fire({
            icon: status === "approved" ? "success" : "warning",
            title:
              status === "approved"
                ? "Rider Application Approved"
                : "Rider Application Rejected",
            text: `Application has been ${status} successfully.`,
            confirmButtonColor: status === "approved" ? "#16a34a" : "#dc2626",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Deleted Successfully",
              confirmButtonColor: "#2563eb",
            });
          }
        });
      }
    });
  };

  return (
    <section className="space-y-6">
      {/* HEADER (MyParcels style consistency) */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Rider Applications
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Manage rider registration requests, verify documents, and control
              approval status
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Applications</p>
            <h3 className="text-lg font-bold text-primary text-center">
              {totalRiders}
            </h3>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Type to search..."
            className="input input-bordered w-full pl-11 focus:outline-none focus:border-primary rounded-full"
          />
        </div>
      </div>

      {/* EMPTY STATE (MyParcels style) */}
      {riders.length === 0 ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FaMotorcycle className="text-4xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-base-content">
              No Rider Applications
            </h2>

            <p className="text-base-content/60 mt-3 max-w-md">
              Currently there are no rider applications available for review.
              New requests will appear here once users apply.
            </p>
          </div>
        </div>
      ) : (
        /* TABLE */
        <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300">
          <table className="table w-full">
            <thead className="bg-base-200 text-sm text-base-content/70">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {riders.map((rider, i) => (
                <tr key={rider._id} className="hover:bg-base-200/40">
                  <td className="text-base-content/70">{i + 1}</td>

                  <td className="font-medium">{rider.riderName}</td>

                  <td className="text-sm text-base-content/70">
                    {rider.riderEmail}
                  </td>

                  <td>
                    <span
                      className={`badge capitalize ${
                        rider.status === "approved"
                          ? "badge-primary"
                          : rider.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(rider)}
                        className="btn btn-sm btn-square btn-ghost btn-outline"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => updateRiderStatus(rider, "approved")}
                        className="btn btn-sm btn-square btn-primary btn-outline"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() => updateRiderStatus(rider, "rejected")}
                        className="btn btn-sm btn-square btn-error btn-outline"
                      >
                        <ImCross />
                      </button>

                      <button
                        onClick={() => handleDelete(rider._id)}
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
      )}

      {/* PAGINATION BTN */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                key={page}
                onClick={() => setCurrentPage(page + 1)}
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

      {/* MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-3xl rounded-2xl p-0 overflow-hidden">
          {/* HEADER */}
          <div className="bg-base-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Rider Application Details</h3>
              <p className="text-xs text-base-content/60">
                Complete information about the applicant
              </p>
            </div>

            <form method="dialog">
              <button className="btn btn-sm btn-square btn-error btn-outline">
                <ImCross />
              </button>
            </form>
          </div>

          {/* BODY */}
          {selectedRider && (
            <div className="p-6 space-y-6">
              {/* STATUS BADGE */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-base-content/60">
                  Application Status
                </span>

                <span
                  className={`badge capitalize ${
                    selectedRider.status === "approved"
                      ? "badge-primary"
                      : selectedRider.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                  }`}
                >
                  {selectedRider.status}
                </span>
              </div>

              {/* GRID INFO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Full Name</p>
                  <p className="font-semibold">{selectedRider.riderName}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Email</p>
                  <p className="font-semibold">{selectedRider.riderEmail}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Phone</p>
                  <p className="font-semibold">{selectedRider.phnNmbr}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">
                    Driving License
                  </p>
                  <p className="font-semibold">{selectedRider.dlNo}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">NID Number</p>
                  <p className="font-semibold">{selectedRider.nidNo}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Bike Info</p>
                  <p className="font-semibold">{selectedRider.bikeInfo}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4 md:col-span-2">
                  <p className="text-xs text-base-content/60">
                    Registration No
                  </p>
                  <p className="font-semibold">{selectedRider.regNo}</p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-xs text-base-content/60 mb-2">
                  About Applicant
                </p>
                <p className="text-sm leading-relaxed">{selectedRider.desc}</p>
              </div>

              {/* FOOTER INFO */}
              <div className="text-xs text-base-content/50 flex justify-between">
                <span>
                  Applied:{" "}
                  {new Date(selectedRider.createdAt).toLocaleDateString()}
                </span>
                <span>ID: {selectedRider._id}</span>
              </div>
            </div>
          )}
        </div>

        {/* BACKDROP */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}
