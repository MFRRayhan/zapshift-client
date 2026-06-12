import {
  FaTruck,
  FaClock,
  FaBolt,
  FaMoneyBill,
  FaBox,
  FaBuilding,
} from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      {/*  HERO  */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content">
          Our Delivery Services
        </h1>

        <p className="text-base-content/60 leading-relaxed">
          Fast, secure, and reliable logistics solutions designed for
          individuals, businesses, and e-commerce merchants across Bangladesh.
          We ensure every parcel reaches its destination safely and on time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="btn btn-primary">Explore Services</button>
          <button className="btn btn-outline">Become a Merchant</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-center">
          <div className="p-4 rounded-2xl bg-base-100 border border-base-300">
            <h3 className="text-2xl font-bold text-primary">10,000+</h3>
            <p className="text-sm text-base-content/60">Deliveries Completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-base-100 border border-base-300">
            <h3 className="text-2xl font-bold text-primary">500+</h3>
            <p className="text-sm text-base-content/60">Active Riders</p>
          </div>
          <div className="p-4 rounded-2xl bg-base-100 border border-base-300">
            <h3 className="text-2xl font-bold text-primary">64</h3>
            <p className="text-sm text-base-content/60">District Coverage</p>
          </div>
        </div>
      </section>

      {/*  SERVICES  */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Service Categories</h2>
          <p className="text-base-content/60">
            Comprehensive logistics solutions tailored to meet personal and
            business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FaClock />,
              title: "Same Day Delivery",
              desc: "Urgent deliveries within the same city completed on the same day.",
            },
            {
              icon: <FaTruck />,
              title: "Next Day Delivery",
              desc: "Affordable nationwide delivery with next-day fulfillment.",
            },
            {
              icon: <FaBolt />,
              title: "Express Delivery",
              desc: "Priority shipping for time-sensitive parcels.",
            },
            {
              icon: <FaMoneyBill />,
              title: "Cash On Delivery",
              desc: "Secure payment collection from customers.",
            },
            {
              icon: <FaBuilding />,
              title: "Merchant Logistics",
              desc: "Complete logistics support for e-commerce businesses.",
            },
            {
              icon: <FaBox />,
              title: "Bulk Shipment",
              desc: "Large-scale parcel handling for enterprises.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-base-100 border border-base-300 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-2xl text-primary mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-base-content/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*  FEATURES  */}
      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Why Choose Us</h2>
          <p className="text-base-content/60 max-w-2xl mx-auto">
            We combine speed, security, and technology to deliver the best
            logistics experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Real-Time Tracking",
            "Secure Parcel Handling",
            "Nationwide Coverage",
            "Affordable Pricing",
            "Fast Pickup Service",
            "24/7 Support",
          ].map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-base-300 bg-base-100 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-base-content">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/*  HOW IT WORKS  */}
      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-base-content/60">
            Simple 4-step delivery process designed for maximum convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            "Schedule Pickup",
            "Parcel Collection",
            "Live Tracking",
            "Delivery Completed",
          ].map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-base-100 border border-base-300 hover:-translate-y-1 transition"
            >
              <div className="text-2xl font-bold text-primary mb-2">
                {i + 1}
              </div>
              <p className="font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  BENEFITS  */}
      <section className="grid md:grid-cols-2 gap-10">
        <div className="p-8 rounded-3xl bg-base-100 border border-base-300">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaShieldHalved className="text-primary" /> For Customers
          </h3>
          <ul className="space-y-2 text-base-content/60">
            <li>• Fast and reliable delivery</li>
            <li>• Real-time tracking system</li>
            <li>• Secure parcel handling</li>
            <li>• Instant notifications</li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-base-100 border border-base-300">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaBuilding className="text-primary" /> For Merchants
          </h3>
          <ul className="space-y-2 text-base-content/60">
            <li>• Bulk shipment support</li>
            <li>• COD management system</li>
            <li>• Dedicated logistics dashboard</li>
            <li>• Business-friendly pricing</li>
          </ul>
        </div>
      </section>

      {/*  CTA  */}
      <section className="text-center bg-primary text-primary-content p-12 rounded-3xl space-y-6">
        <h2 className="text-3xl font-bold">Ready to Ship Your Parcel?</h2>
        <p className="opacity-90 max-w-2xl mx-auto">
          Experience fast, secure, and reliable delivery services across
          Bangladesh.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={"/send-parcel"} className="btn btn-neutral">
            Send a Parcel
          </Link>
          <Link to={"/be-a-rider"} className="btn btn-outline btn-white">
            Become a Rider
          </Link>
        </div>
      </section>
    </div>
  );
}
