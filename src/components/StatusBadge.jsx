const badgeConfig = {
  parcel_created: {
    label: "Parcel Created",
    className: "badge-warning",
  },
  not_collected: {
    label: "Not Collected",
    className: "badge-warning",
  },
  pending_pickup: {
    label: "Pending Pickup",
    className: "badge-warning",
  },
  driver_assigned: {
    label: "Awaiting Driver Response",
    className: "badge-warning",
  },
  rider_accepted: {
    label: "Accepted",
    className: "badge-primary",
  },
  picked_up: {
    label: "Picked Up",
    className: "badge-info",
  },
  in_transit: {
    label: "In Transit",
    className: "badge-secondary",
  },
  delivered: {
    label: "Delivered",
    className: "badge-primary",
  },
  driver_rejected: {
    label: "Pending Pickup",
    className: "badge-warning",
  },
  paid: {
    label: "Paid",
    className: "badge-primary",
  },
  unpaid: {
    label: "Unpaid",
    className: "badge-error",
  },
};

export default function StatusBadge({ status }) {
  const currentStatus = badgeConfig[status] || {
    label: status || "Unknown",
    className: "badge-neutral",
  };

  return (
    <span
      className={`badge capitalize font-semibold ${currentStatus.className}`}
    >
      {currentStatus.label}
    </span>
  );
}
