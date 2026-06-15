import feature1 from "../assets/img/live-parcel-tracking.png";
import feature2 from "../assets/img/safe-delivery.png";
import feature3 from "../assets/img/customer-top.png";
import { FadeInUp } from "./AnimationWrappers";

const cardBase =
  "bg-base-100 rounded-4xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm transition-all duration-500 ease-out group hover:shadow-xl hover:-translate-y-1 hover:border hover:border-base-300";

const imageBase =
  "max-h-35 w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-1";

export default function Features() {
  return (
    <main className="container flex flex-col gap-6 py-10 px-4">
      {/* Card 1 */}
      <FadeInUp>
        <section className={cardBase}>
          <div className="shrink-0 w-full md:w-1/3 flex justify-center items-center">
            <img
              src={feature1}
              alt="Live Parcel Tracking"
              className={imageBase}
            />
          </div>

          <div className="hidden md:block border-l-2 border-dashed border-base-300 h-20 opacity-60 group-hover:opacity-100 transition" />

          <div className="grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary mb-3 transition-colors duration-300">
              Live Parcel Tracking
            </h2>
            <p className="text-base-content/70 leading-relaxed transition-colors duration-300 group-hover:text-base-content/90">
              Stay updated in real-time with our live parcel tracking feature.
              From pick-up to delivery, monitor your shipment's journey and get
              instant updates.
            </p>
          </div>
        </section>
      </FadeInUp>

      {/* Card 2 */}
      <FadeInUp delay={0.1}>
        <section className={cardBase}>
          <div className="shrink-0 w-full md:w-1/3 flex justify-center items-center">
            <img src={feature2} alt="Safe Delivery" className={imageBase} />
          </div>

          <div className="hidden md:block border-l-2 border-dashed border-base-300 h-20 opacity-60 group-hover:opacity-100 transition" />

          <div className="grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary mb-3 transition-colors duration-300">
              100% Safe Delivery
            </h2>
            <p className="text-base-content/70 leading-relaxed transition-colors duration-300 group-hover:text-base-content/90">
              We ensure your parcels are handled with care and delivered securely.
              Our process guarantees safe and damage-free delivery every time.
            </p>
          </div>
        </section>
      </FadeInUp>

      {/* Card 3 */}
      <FadeInUp delay={0.2}>
        <section className={cardBase}>
          <div className="shrink-0 w-full md:w-1/3 flex justify-center items-center">
            <img src={feature3} alt="Support" className={`${imageBase}`} />
          </div>

          <div className="hidden md:block border-l-2 border-dashed border-base-300 h-20 opacity-60 group-hover:opacity-100 transition" />

          <div className="grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-primary mb-3 transition-colors duration-300">
              24/7 Call Center Support
            </h2>
            <p className="text-base-content/70 leading-relaxed transition-colors duration-300 group-hover:text-base-content/90">
              Our support team is available around the clock to assist you
              anytime.
            </p>
          </div>
        </section>
      </FadeInUp>
    </main>
  );
}
