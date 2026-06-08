import trackingImg from "../assets/img/big-deliveryman.png";

export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div className="space-y-5">
          <h1 className="text-5xl font-bold text-base-content leading-tight">
            About <span className="text-primary">ZapShift</span>
          </h1>

          <p className="text-base-content/60 leading-relaxed">
            We are a modern logistics and parcel delivery platform committed to
            speed, reliability, and transparency. From pickup to doorstep, we
            ensure every parcel reaches safely and on time with real-time
            tracking.
          </p>

          <div className="flex gap-3">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl"></div>

            <img
              src={trackingImg}
              alt="About ZapShift"
              className="relative w-full max-w-md rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Parcels Delivered", value: "10,000+" },
          { label: "Active Riders", value: "500+" },
          { label: "Coverage Areas", value: "64 Districts" },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-base-300 bg-base-100 text-center shadow-sm"
          >
            <h2 className="text-3xl font-bold text-primary">{item.value}</h2>
            <p className="text-base-content/60 mt-2">{item.label}</p>
          </div>
        ))}
      </section>

      {/* ================= FEATURES ================= */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Fast Delivery",
            desc: "Optimized logistics system ensures quick and efficient parcel delivery across all regions.",
          },
          {
            title: "Real-Time Tracking",
            desc: "Track your parcel live from pickup to delivery with instant status updates.",
          },
          {
            title: "Secure Handling",
            desc: "Every parcel is handled with care using verified riders and secure logistics processes.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-base-300 bg-base-100 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-base-content/60 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ================= TABS ================= */}
      <section className="bg-base-100 border border-base-300 rounded-2xl p-6">
        <div className="tabs tabs-lift">
          {/* STORY */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium checked:font-bold"
            aria-label="Story"
          />
          <div className="tab-content p-6 space-y-4">
            <p className="text-base-content/70 leading-relaxed">
              ZapShift started with a vision to solve the common problems in
              traditional delivery systems such as delays, lack of tracking, and
              poor communication between customers and riders.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We built a smart logistics platform that connects customers,
              riders, and businesses in a seamless delivery ecosystem powered by
              technology.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Today we serve thousands of users with a focus on trust, speed,
              and transparency in every delivery.
            </p>
          </div>

          {/* MISSION */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium checked:font-bold"
            aria-label="Mission"
            defaultChecked
          />
          <div className="tab-content p-6 space-y-4">
            <p className="text-base-content/70 leading-relaxed">
              Our mission is to make parcel delivery simple, fast, and reliable
              for everyone.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We focus on real-time tracking, secure handling, and efficient
              logistics management.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Our goal is to become the most trusted delivery platform in the
              country.
            </p>
          </div>

          {/* SUCCESS */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium checked:font-bold"
            aria-label="Success"
          />
          <div className="tab-content p-6 space-y-4">
            <p className="text-base-content/70 leading-relaxed">
              We have successfully delivered thousands of parcels with high
              satisfaction and reliability.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Our growing network of riders and hubs ensures fast and efficient
              service across regions.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Continuous improvement and customer feedback drive our success
              every day.
            </p>
          </div>

          {/* TEAM */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium checked:font-bold"
            aria-label="Team"
          />
          <div className="tab-content p-6 space-y-4">
            <p className="text-base-content/70 leading-relaxed">
              Our team includes developers, logistics experts, support agents,
              warehouse staff, and professional riders.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We believe in teamwork, accountability, and continuous innovation.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Every parcel reflects our commitment to quality and
              responsibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
