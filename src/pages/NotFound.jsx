import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-base-100 rounded-3xl shadow-sm border border-base-300 p-8 md:p-12 text-center">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-error/10 flex items-center justify-center text-error mb-8">
          <FaExclamationTriangle size={40} />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl md:text-7xl font-bold text-error mb-4">404</h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
          The page you are looking for might have been removed, renamed, or is
          temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <button className="btn btn-primary px-8">Back To Home</button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline px-8"
          >
            Go Back
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-10 pt-6 border-t border-base-300">
          <p className="text-sm text-gray-400">
            Error Code: 404 | Resource could not be located.
          </p>
        </div>
      </div>
    </div>
  );
}
