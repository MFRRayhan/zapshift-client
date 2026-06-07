import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";
import trackingImg from "../assets/img/live-tracking.png";

export default function ParcelTrackDetails() {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ["logs", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/parcel-track/${trackingId}`);
      return res.data?.history || [];
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SIDE - TRACKING INFO */}
        <div className="space-y-5">
          <div>
            <h2 className="text-4xl font-bold">Parcel Tracking Details</h2>

            <p className="text-gray-500 mt-2">
              Tracking ID:{" "}
              <span className="text-primary font-semibold">{trackingId}</span>
            </p>
          </div>

          {/* TIMELINE */}
          <div className="mt-8">
            <ul className="timeline timeline-vertical">
              {isLoading ? (
                <p className="text-gray-500">Loading tracking data...</p>
              ) : (
                logs.map((log) => (
                  <li key={log._id}>
                    <div className="timeline-start text-xs text-gray-500">
                      {moment(log.createdAt).format("DD MMM YYYY, hh:mm A")}
                    </div>

                    <div className="timeline-middle">
                      <FaCheckCircle className="text-primary" />
                    </div>

                    <div className="timeline-end timeline-box capitalize text-primary font-medium">
                      {log.details}
                    </div>

                    <hr />
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center">
          <img src={trackingImg} alt="Parcel Tracking" className="w-full" />
        </div>
      </div>
    </div>
  );
}
