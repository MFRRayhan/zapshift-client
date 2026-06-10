import { useState } from "react";

export default function BecomeAMerchant() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Merchant Application:", form);
  };

  return (
    <div className="container py-12 space-y-12">
      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-base-content leading-tight">
            Become a <span className="text-primary">Merchant Partner</span>
          </h1>

          <p className="text-base-content/60 leading-relaxed">
            Join our growing logistics ecosystem and expand your business with
            fast, reliable, and nationwide delivery support. Whether you run an
            online shop or physical store, we help you reach customers faster
            and deliver products safely across all regions.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="btn btn-primary hover:scale-[1.03] transition">
              Start Application
            </button>
            <button className="btn btn-outline hover:bg-base-200 transition">
              Learn Benefits
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4">Why Partner With Us?</h2>

          <ul className="space-y-3 text-base-content/70">
            <li>• Fast nationwide delivery network</li>
            <li>• Real-time parcel tracking system</li>
            <li>• Secure payment & cash on delivery support</li>
            <li>• Dedicated merchant support team</li>
            <li>• Easy dashboard for order management</li>
          </ul>
        </div>
      </section>

      {/* ================= BENEFITS GRID ================= */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Faster Delivery",
            desc: "Deliver products quickly with optimized logistics and trained riders.",
          },
          {
            title: "Business Growth",
            desc: "Expand your reach and increase sales with nationwide coverage.",
          },
          {
            title: "Secure Handling",
            desc: "Every parcel is handled safely with verified delivery agents.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-base-300 bg-base-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
              {item.title}
            </h3>
            <p className="text-base-content/60 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ================= APPLICATION FORM ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-start">
        {/* INFO SIDE */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-base-content">Apply Now</h2>

          <p className="text-base-content/60 leading-relaxed">
            Fill out the form below to become a merchant partner. Our team will
            review your application and contact you shortly with onboarding
            details.
          </p>

          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 space-y-3 shadow-sm">
            <p className="font-medium">What happens next?</p>
            <p className="text-base-content/60 text-sm">
              1. We review your application <br />
              2. Verify business details <br />
              3. Activate merchant dashboard <br />
              4. Start delivering instantly
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 border border-base-300 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            name="businessName"
            placeholder="Business Name"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <textarea
            name="address"
            placeholder="Business Address"
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />

          <textarea
            name="message"
            placeholder="Why do you want to join?"
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}
