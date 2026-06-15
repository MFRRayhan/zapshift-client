import {
  FaTruckFast,
  FaGlobe,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaRotateLeft,
} from "react-icons/fa6";
import { FadeInUp, StaggerContainer, StaggerItem } from "./AnimationWrappers";

export default function OurServices() {
  const services = [
    {
      icon: FaTruckFast,
      title: "Express & Standard Delivery",
      desc: "Fast delivery options including same-day service in Dhaka and 24–72 hour nationwide delivery across all major districts with real-time tracking.",
    },
    {
      icon: FaGlobe,
      title: "Nationwide Coverage",
      desc: "We operate across all 64 districts of Bangladesh ensuring reliable parcel movement from urban cities to remote areas with consistent service quality.",
    },
    {
      icon: FaWarehouse,
      title: "Fulfillment Solution",
      desc: "End-to-end logistics support including storage, packaging, inventory handling, and order processing for e-commerce and online businesses.",
    },
    {
      icon: FaMoneyBillWave,
      title: "Cash on Delivery (COD)",
      desc: "Secure COD service with trusted payment collection, fast settlement cycles, and transparent transaction tracking for business owners.",
    },
    {
      icon: FaBuilding,
      title: "Corporate Logistics Service",
      desc: "Dedicated logistics solutions for SMEs and enterprises including bulk shipment handling, priority delivery, and customized operations support.",
    },
    {
      icon: FaRotateLeft,
      title: "Easy Parcel Return",
      desc: "Hassle-free return management system for customers and businesses with reverse logistics support and quick pickup scheduling.",
    },
  ];

  return (
    <div className="bg-secondary py-16">
      <div className="container">
        {/* HEADER */}
        <FadeInUp className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white!">Our Services</h2>

          <p className="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
            We provide end-to-end logistics solutions designed for individuals,
            e-commerce businesses, and enterprises with speed, reliability, and
            full transparency.
          </p>
        </FadeInUp>

        {/* CARDS */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;

            return (
              <StaggerItem
                key={i}
                className="group bg-base-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-content transition">
                  <Icon size={22} />
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-base-content mb-2">
                  {s.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-base-content/70 leading-relaxed">
                  {s.desc}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
