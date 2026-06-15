import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { FadeInUp, StaggerContainer, StaggerItem, HoverScale } from "../components/AnimationWrappers";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "We will contact you soon.",
      confirmButtonColor: "#16a34a",
    });

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* CONTACT INFO */}
        <div className="space-y-8">
          <FadeInUp className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-sm">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-base-content/60 mt-3 text-lg">
              We’re here to help you anytime. Reach out to us through any of the channels below.
            </p>
          </FadeInUp>

          <StaggerContainer className="space-y-4">
            <StaggerItem className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-2xl p-6 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Email Us</p>
                <p className="font-semibold">support@zapshift.com</p>
              </div>
            </StaggerItem>

            <StaggerItem className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-2xl p-6 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                <FaPhone />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Call Us</p>
                <p className="font-semibold">+880 1234 567 890</p>
              </div>
            </StaggerItem>

            <StaggerItem className="flex items-center gap-4 bg-base-100 border border-base-300 rounded-2xl p-6 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-base-content/60">Visit Us</p>
                <p className="font-semibold">Dhaka, Bangladesh</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* FORM */}
        <FadeInUp delay={0.2}>
          <form
            onSubmit={handleSubmit}
            className="bg-base-100 border border-base-300 rounded-3xl p-8 shadow-md space-y-5"
          >
            <h2 className="text-2xl font-bold mb-4">Send us a message</h2>
          <div>
            <label className="label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

            <div>
              <label className="label">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full h-32 focus:border-primary"
                placeholder="How can we help you?"
                required
              />
            </div>

            <HoverScale>
              <button className="btn btn-primary w-full shadow-md text-lg h-12">Send Message</button>
            </HoverScale>
          </form>
        </FadeInUp>
      </div>
    </div>
  );
}
