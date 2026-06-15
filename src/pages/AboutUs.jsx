import trackingImg from "../assets/img/big-deliveryman.png";
import { FadeInUp, HoverScale, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";

export default function AboutUs() {
  return (
    <div className="container py-12 space-y-16">
      {/* ================= HERO ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <FadeInUp className="space-y-5 text-center md:text-left">
          <h1 className="text-5xl font-bold text-base-content leading-tight">
            About <span className="text-primary">ZapShift</span>
          </h1>

          <p className="text-base-content/60 leading-relaxed">
            We are a modern logistics and parcel delivery platform committed to
            speed, reliability, and transparency. From pickup to doorstep, we
            ensure every parcel reaches safely and on time with real-time
            tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <HoverScale>
              <button className="btn btn-primary w-full sm:w-auto shadow-md">
                Get Started
              </button>
            </HoverScale>

            <HoverScale>
              <button className="btn btn-outline w-full sm:w-auto shadow-md">
                Learn More
              </button>
            </HoverScale>
          </div>
        </FadeInUp>

        {/* RIGHT IMAGE */}
        <FadeInUp delay={0.2} className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-500" />

            <img
              src={trackingImg}
              alt="About ZapShift"
              className="relative w-full max-w-md rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </FadeInUp>
      </section>

      {/* ================= STATS ================= */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Parcels Delivered", value: "10,000+" },
          { label: "Active Riders", value: "500+" },
          { label: "Coverage Areas", value: "64 Districts" },
        ].map((item, i) => (
          <StaggerItem
            key={i}
            className="
              p-6 rounded-2xl border border-base-300 bg-base-100 text-center
              shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:border-primary/30
              cursor-default
            "
          >
            <h2 className="text-3xl font-bold text-primary transition-all duration-300">
              {item.value}
            </h2>
            <p className="text-base-content/60 mt-2">{item.label}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ================= FEATURES ================= */}
      <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
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
          <StaggerItem
            key={i}
            className="
              p-6 rounded-2xl border border-base-300 bg-base-100
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:border-primary/30
              group cursor-default
            "
          >
            <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
              {f.title}
            </h3>

            <p className="text-base-content/60 leading-relaxed">{f.desc}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* ================= TABS ================= */}
      <FadeInUp className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
        <div className="tabs tabs-lift">
          {/* STORY */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium transition-all"
            aria-label="Story"
          />
          <div className="tab-content p-6 space-y-4 animate-fade-in">
            <p className="text-base-content/70 leading-relaxed">
              ZapShift began with a simple but important goal: to modernize the
              traditional parcel delivery system and solve long-standing issues
              such as delays, lack of transparency, and unreliable communication
              between senders and delivery agents.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We noticed that both businesses and individuals often struggled to
              track their parcels in real time or trust delivery timelines. This
              inspired us to build a digital-first logistics platform that
              connects customers, riders, and merchants in a seamless ecosystem.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Today, ZapShift continues to grow as a technology-driven courier
              service focused on reliability, speed, and transparency in every
              delivery.
            </p>
          </div>

          {/* MISSION */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium"
            aria-label="Mission"
            defaultChecked
          />
          <div className="tab-content p-6 space-y-4 animate-fade-in">
            <p className="text-base-content/70 leading-relaxed">
              Our mission is to redefine parcel delivery by making it faster,
              smarter, and more reliable for everyone—from individual users to
              large-scale businesses.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We aim to eliminate uncertainty in logistics by providing
              real-time tracking, secure handling, and optimized delivery routes
              powered by modern technology and data-driven systems.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Ultimately, our goal is to build a trusted delivery infrastructure
              that ensures every parcel reaches its destination safely,
              efficiently, and on time.
            </p>
          </div>

          {/* SUCCESS */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium"
            aria-label="Success"
          />
          <div className="tab-content p-6 space-y-4 animate-fade-in">
            <p className="text-base-content/70 leading-relaxed">
              Over time, ZapShift has successfully delivered thousands of
              parcels with a strong focus on customer satisfaction, reliability,
              and operational efficiency.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Our expanding network of riders, hubs, and delivery partners
              allows us to maintain fast turnaround times and consistent service
              quality across different regions.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Continuous improvement, feedback-driven development, and process
              optimization have played a key role in our ongoing success.
            </p>
          </div>

          {/* TEAM */}
          <input
            type="radio"
            name="about_tabs"
            className="tab text-lg font-medium"
            aria-label="Team"
          />
          <div className="tab-content p-6 space-y-4 animate-fade-in">
            <p className="text-base-content/70 leading-relaxed">
              Our team is a diverse group of professionals including software
              engineers, logistics coordinators, customer support specialists,
              and experienced delivery riders working together to ensure smooth
              operations.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              We believe that strong teamwork, accountability, and continuous
              learning are the foundation of a successful logistics platform.
            </p>

            <p className="text-base-content/70 leading-relaxed">
              Every member of our team plays a critical role in ensuring that
              each parcel is handled with care and delivered with precision.
            </p>
          </div>
        </div>
      </FadeInUp>
    </div>
  );
}
