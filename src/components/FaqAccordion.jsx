import { FadeInUp, StaggerContainer, StaggerItem } from "./AnimationWrappers";

export default function FaqAccordion() {
  return (
    <div className="container py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <FadeInUp className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base-content/60 leading-relaxed max-w-2xl mx-auto">
            Find clear answers about how our posture support system works, who
            it is suitable for, and how it can help improve your daily comfort,
            alignment, and long-term spinal health.
          </p>
        </FadeInUp>

        {/* Accordion */}
        <StaggerContainer className="space-y-4">
          {/* 1 */}
          <StaggerItem className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
            <input type="radio" name="faq" defaultChecked />
            <div className="collapse-title font-semibold text-base-content text-lg">
              How does this posture corrector actually work?
            </div>
            <div className="collapse-content text-base-content/70 leading-relaxed space-y-3">
              <p>
                The posture corrector is designed to gently guide your shoulders
                and upper back into a naturally aligned position. It works by
                providing light structural resistance that reminds your muscles
                to maintain proper posture throughout the day.
              </p>
              <p>
                Over time, consistent use helps train muscle memory, reducing
                slouching habits and improving spinal alignment even when you
                are not wearing it.
              </p>
            </div>
          </StaggerItem>

          {/* 2 */}
          <StaggerItem className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
            <input type="radio" name="faq" />
            <div className="collapse-title font-semibold text-base-content text-lg">
              Is it suitable for all ages and body types?
            </div>
            <div className="collapse-content text-base-content/70 leading-relaxed space-y-3">
              <p>
                Yes, the design is adjustable and built to accommodate a wide
                range of body types, including teenagers, adults, and elderly
                users. The straps can be customized to ensure a secure yet
                comfortable fit.
              </p>
              <p>
                However, individuals with specific spinal conditions or medical
                concerns should consult a healthcare professional before using
                any posture support device.
              </p>
            </div>
          </StaggerItem>

          {/* 3 */}
          <StaggerItem className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
            <input type="radio" name="faq" />
            <div className="collapse-title font-semibold text-base-content text-lg">
              Can it really help reduce back pain and improve posture?
            </div>
            <div className="collapse-content text-base-content/70 leading-relaxed space-y-3">
              <p>
                The posture corrector helps reduce strain on the lower and upper
                back by encouraging proper spinal alignment. This reduces
                unnecessary pressure on muscles that are often overworked due to
                poor sitting or standing habits.
              </p>
              <p>
                While it is not a medical treatment, many users experience
                noticeable improvement in comfort and posture consistency within
                a few weeks of regular use.
              </p>
            </div>
          </StaggerItem>

          {/* 4 */}
          <StaggerItem className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
            <input type="radio" name="faq" />
            <div className="collapse-title font-semibold text-base-content text-lg">
              Does it include smart vibration or posture alerts?
            </div>
            <div className="collapse-content text-base-content/70 leading-relaxed space-y-3">
              <p>
                Some advanced versions include subtle vibration feedback that
                activates when slouching is detected. This gentle reminder helps
                you correct posture instantly without discomfort or distraction.
              </p>
              <p>
                It is designed to be minimal and non-intrusive, making it
                suitable for office, study, or daily home use.
              </p>
            </div>
          </StaggerItem>

          {/* 5 */}
          <StaggerItem className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-2xl">
            <input type="radio" name="faq" />
            <div className="collapse-title font-semibold text-base-content text-lg">
              How will I know when the product is back in stock?
            </div>
            <div className="collapse-content text-base-content/70 leading-relaxed space-y-3">
              <p>
                If the product is temporarily unavailable, you can subscribe to
                stock alerts. Once it is restocked, you will receive an instant
                notification via email or SMS depending on your preference.
              </p>
              <p>
                We prioritize high-demand items and usually restock within a
                short timeframe based on availability and demand trends.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* CTA Button */}
        <FadeInUp className="flex justify-center mt-10">
          <button className="btn btn-primary">See More FAQs</button>
        </FadeInUp>
      </div>
    </div>
  );
}
