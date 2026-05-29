import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  FaEye,
  FaMotorcycle,
  FaTrash,
  FaUserShield,
  FaUserSlash,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbBikeOff } from "react-icons/tb";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function UsersManagement() {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const openModal = (user) => {
    setSelectedUser(user);
    modalRef.current?.showModal();
  };

  const updateUserStatus = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will update user role.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}`, {
            role,
            email: user.userEmail,
          })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();

              Swal.fire({
                icon: "success",
                title: "Updated Successfully",
                confirmButtonColor: "#16a34a",
              });
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
      {/* HEADER (MyParcels style) */}
      <div className="bg-base-100 border border-base-300 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-base-content">
              Users Management
            </h2>
            <p className="text-sm text-base-content/60 mt-1">
              Manage system users, roles, and permissions
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <p className="text-xs text-base-content/60">Total Users</p>
            <h3 className="text-lg font-bold text-primary text-center">
              {users.length}
            </h3>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-2xl">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm text-base-content/70">
            <tr>
              <th>Index</th>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => (
              <tr key={user._id} className="hover:bg-base-200/40">
                <td className="text-base-content/70">{i + 1}</td>

                {/* USER INFO */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold">{user.displayName}</p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td>
                  <span className="badge badge-primary capitalize">
                    {user.role}
                  </span>
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(user)}
                      className="btn btn-sm btn-square btn-ghost btn-outline"
                      title="View User"
                    >
                      <FaEye />
                    </button>

                    {user.role === "admin" ? (
                      <button
                        onClick={() => updateUserStatus(user, "user")}
                        className="btn btn-sm btn-square btn-error btn-outline"
                        title="Remove Admin"
                      >
                        <FaUserSlash />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserStatus(user, "admin")}
                        className="btn btn-sm btn-square btn-primary btn-outline"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    )}

                    {user?.role === "rider" ? (
                      <button
                        onClick={() => updateUserStatus(user, "user")}
                        className="btn btn-sm btn-square btn-error btn-outline"
                        title="Remove Rider"
                      >
                        <TbBikeOff />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserStatus(user, "rider")}
                        className="btn btn-sm btn-square btn-primary btn-outline"
                        title="Make Rider"
                      >
                        <FaMotorcycle />
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-sm btn-square btn-error btn-outline"
                      title="Delete User"
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

      {/* MODAL */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-3xl rounded-2xl p-0 overflow-hidden">
          {/* HEADER */}
          <div className="bg-base-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">User Details</h3>
              <p className="text-xs text-base-content/60">
                Complete user profile information
              </p>
            </div>

            <form method="dialog">
              <button className="btn btn-sm btn-square btn-error btn-outline">
                <ImCross />
              </button>
            </form>
          </div>

          {/* BODY */}
          {selectedUser && (
            <div className="p-6 space-y-6">
              {/* TOP USER INFO */}
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-full">
                    <img
                      src={selectedUser.photoURL}
                      alt={selectedUser.displayName}
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {selectedUser.displayName}
                  </h2>
                  <p className="text-sm text-base-content/60">
                    {selectedUser.userEmail}
                  </p>

                  <span className="badge badge-primary mt-1 capitalize">
                    {selectedUser.role}
                  </span>
                </div>
              </div>

              {/* INFO GRID */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Email</p>
                  <p className="font-semibold">{selectedUser.userEmail}</p>
                </div>

                <div className="bg-base-200 rounded-xl p-4">
                  <p className="text-xs text-base-content/60">Role</p>
                  <p className="font-semibold capitalize">
                    {selectedUser.role}
                  </p>
                </div>

                <div className="bg-base-200 rounded-xl p-4 ">
                  <p className="text-xs text-base-content/60">User ID</p>
                  <p className="font-semibold">{selectedUser._id}</p>
                </div>
                <div className="bg-base-200 rounded-xl p-4 ">
                  <p className="text-xs text-base-content/60">Joined At:</p>
                  <p className="font-semibold">{selectedUser.createdAt}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </section>
  );
}
