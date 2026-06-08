import {
  FaBoxOpen,
  FaTruckFast,
  FaWarehouse,
  FaBuilding,
} from "react-icons/fa6";

export default function HowItWorks() {
  const steps = [
    {
      icon: FaBoxOpen,
      title: "Booking Pick & Drop",
      desc: "Schedule pickup from your home or office. Our rider collects your parcel at your preferred time and ensures safe handling from the very first step.",
    },
    {
      icon: FaTruckFast,
      title: "Cash on Delivery",
      desc: "We provide secure Cash on Delivery service, ensuring smooth payment collection and reliable transaction handling for businesses and customers.",
    },
    {
      icon: FaWarehouse,
      title: "Delivery Hub Processing",
      desc: "Your parcel is sorted, scanned, and processed at the nearest hub using an optimized logistics system for faster and accurate delivery.",
    },
    {
      icon: FaBuilding,
      title: "SME & Corporate Solutions",
      desc: "Dedicated logistics support for SMEs and corporate clients with bulk shipping, priority handling, and scalable delivery solutions.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-base-content">How It Works</h2>
        <p className="text-base-content/60 mt-2 max-w-2xl">
          A simple and transparent process designed to make your parcel delivery
          fast, secure, and hassle-free from booking to delivery.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-base-300 p-6 space-y-4
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* ICON */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon size={22} />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-base-content">
                {step.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-base-content/60 leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
