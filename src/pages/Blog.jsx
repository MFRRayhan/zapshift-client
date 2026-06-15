import { Link } from "react-router-dom";
import { blogsData as blogs } from "../utils/blogData";
import { FadeInUp, StaggerContainer, StaggerItem } from "../components/AnimationWrappers";
export default function Blog() {
  return (
    <div className="container">
      <div className="space-y-8">
        {/* HEADER */}
        <FadeInUp className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-10 shadow-sm text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Blog & Insights</h1>
          <p className="text-base-content/60 mt-2 text-lg">
            Latest updates, guides and industry insights
          </p>
        </FadeInUp>

        {/* FEATURED */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <StaggerItem
              key={blog.id}
              className="bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <img
                src={blog.image}
                className="h-48 w-full object-cover"
                alt={blog.title}
              />

              <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="flex-1 space-y-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {blog.category}
                  </span>

                  <h2 className="text-xl font-bold leading-snug line-clamp-2 hover:text-primary transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-base-content/60 line-clamp-3">
                    {blog.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-base-content/50 pt-2">
                  <span className="flex items-center gap-1">
                    <FaUser /> {blog.author}
                  </span>

                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> {blog.date}
                  </span>
                </div>

                <Link to={`/blog/${blog.id}`} className="btn btn-primary w-full mt-2 flex items-center gap-2 group">
                  Read More <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
