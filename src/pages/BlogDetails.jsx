import { useParams, Link } from "react-router-dom";
import { blogsData } from "../utils/blogData";
import { FadeInUp } from "../components/AnimationWrappers";
import { FaArrowLeft, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
        <Link to="/blog" className="btn btn-primary">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10 max-w-3xl">
      <FadeInUp>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <FaArrowLeft /> Back to Blogs
        </Link>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <div className="mb-8 space-y-4">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-base-content/60 text-sm pt-2">
            <span className="flex items-center gap-2">
              <FaUser /> {blog.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt /> {blog.date}
            </span>
          </div>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-auto max-h-[400px] object-cover rounded-3xl shadow-md mb-10"
        />
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div className="space-y-6 text-lg text-base-content/80 leading-relaxed">
          {blog.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.trim().startsWith('### ')) {
              return <h3 key={index} className="text-2xl font-bold text-secondary mt-8 mb-4">{paragraph.replace('### ', '')}</h3>
            }
            if (paragraph.trim().length === 0) return null;
            return <p key={index}>{paragraph.trim()}</p>
          })}
        </div>
      </FadeInUp>
    </div>
  );
}
