import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import trackingImg from "../assets/img/live-tracking.png";

export default function ParcelTrack() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleParcelTrack = (data) => {
    navigate(`/parcel-track/${data.trackingId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE */}
        <form
          onSubmit={handleSubmit(handleParcelTrack)}
          className="w-full max-w-md space-y-5"
        >
          <fieldset className="fieldset">
            {/* HEADER */}
            <div>
              <h2 className="text-4xl font-bold mb-2">Track Your Parcel</h2>
              <p className="text-gray-500">
                Enter your tracking ID to get live status updates
              </p>
            </div>

            {/* INPUT */}
            <div className="mt-10">
              <label className="label mb-1">Tracking ID</label>

              <input
                className="input input-bordered w-full focus:outline-none focus:border-primary"
                type="text"
                placeholder="Enter your parcel tracking id"
                {...register("trackingId", {
                  required: "Tracking ID is required",
                })}
              />

              {errors.trackingId && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.trackingId.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button className="btn btn-primary w-full">Track Now</button>

            {/* NOTE */}
            <p className="text-center text-sm text-gray-500">
              Tracking updates are available in real-time
            </p>
          </fieldset>
        </form>

        {/* RIGHT SIDE  */}
        <div className="flex justify-center">
          <img src={trackingImg} alt="Parcel Tracking" className="w-full" />
        </div>
      </div>
    </div>
  );
}
