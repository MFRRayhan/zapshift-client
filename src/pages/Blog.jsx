import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    title: "How to Optimize Parcel Delivery Performance",
    desc: "Learn modern strategies to improve delivery speed, accuracy, and customer satisfaction.",
    author: "Admin",
    date: "2026-06-10",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
  },
  {
    id: 2,
    title: "Top 10 Tips for Riders Efficiency",
    desc: "Boost your rider productivity with these real-world proven techniques.",
    author: "System",
    date: "2026-05-28",
    category: "Riders",
    image: "https://images.unsplash.com/photo-1558980664-769e2c3b8a3d",
  },
  {
    id: 3,
    title: "Future of Smart Delivery Systems",
    desc: "AI-driven logistics is changing how parcels move across cities.",
    author: "Tech Team",
    date: "2026-05-18",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1581091870622-1e7b7e4a6b3c",
  },
];

export default function Blog() {
  return (
    <div className="container">
      <div className="space-y-8">
        {/* HEADER */}
        <div className="bg-base-100 border border-base-300 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Blog & Insights</h1>
          <p className="text-base-content/60 mt-1">
            Latest updates, guides and industry insights
          </p>
        </div>

        {/* FEATURED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={blog.image}
                className="h-48 w-full object-cover"
                alt={blog.title}
              />

              <div className="p-5 space-y-3">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {blog.category}
                </span>

                <h2 className="text-lg font-bold leading-snug">{blog.title}</h2>

                <p className="text-sm text-base-content/60">{blog.desc}</p>

                <div className="flex items-center justify-between text-xs text-base-content/50 pt-2">
                  <span className="flex items-center gap-1">
                    <FaUser /> {blog.author}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {blog.date}
                  </span>
                </div>

                <button className="btn btn-primary btn-sm w-full mt-3 flex items-center gap-2">
                  Read More <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
