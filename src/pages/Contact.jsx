import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

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
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CONTACT INFO */}
        <div className="space-y-6">
          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold">Contact Us</h1>
            <p className="text-base-content/60 mt-1">
              We’re here to help you anytime
            </p>
          </div>

          <div className="bg-base-100 border border-base-300 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <span>support@zapshift.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhone className="text-primary" />
              <span>+880 1234 567 890</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm space-y-4"
        >
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
              className="textarea textarea-bordered w-full h-32"
              required
            />
          </div>

          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}
