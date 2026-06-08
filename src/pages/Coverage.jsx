import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkedAlt, FaSearch, FaTruck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

import "leaflet/dist/leaflet.css";

export default function Coverage() {
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const position = [23.685, 90.3563];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSearch = (data) => {
    const location = data.locationName.trim().toLowerCase();

    const matchedCenter = serviceCenters.find(
      (center) =>
        center.district.toLowerCase().includes(location) ||
        center.covered_area?.some((area) =>
          area.toLowerCase().includes(location),
        ),
    );

    if (!matchedCenter) {
      Swal.fire({
        icon: "error",
        title: "Location Not Found",
        text: "Sorry, we currently do not provide service in this location.",
        confirmButtonColor: "#009966",
      });

      return;
    }

    const coordinates = [
      Number(matchedCenter.latitude),
      Number(matchedCenter.longitude),
    ];

    mapRef.current?.flyTo(coordinates, 12, {
      animate: true,
      duration: 1.5,
    });

    Swal.fire({
      icon: "success",
      title: matchedCenter.district,
      html: `
        <p style="margin-bottom:10px;">
          Service is available in this district.
        </p>
        <strong>Covered Areas:</strong>
        <br/>
        ${matchedCenter.covered_area.join(", ")}
      `,
      confirmButtonColor: "#009966",
    });

    reset();
  };

  return (
    <section className="container py-10 space-y-10">
      {/* HERO */}
      <div className="rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-secondary/10 border border-base-300 p-8 lg:p-12">
        <div className="max-w-3xl">
          <div className="badge badge-primary badge-outline mb-4">
            Nationwide Coverage
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-base-content leading-tight">
            We Deliver Across Bangladesh
          </h1>

          <p className="text-base-content/70 mt-5 text-lg leading-relaxed">
            Our logistics network covers major districts and service areas
            throughout Bangladesh. Enjoy fast parcel pickup, real-time tracking,
            secure transportation, and reliable last-mile delivery.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
          <FaMapMarkedAlt className="text-primary text-4xl mb-4" />

          <h3 className="text-3xl font-bold">64+</h3>

          <p className="text-base-content/60 mt-2">
            District Coverage Across Bangladesh
          </p>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
          <MdLocationOn className="text-primary text-4xl mb-4" />

          <h3 className="text-3xl font-bold">{serviceCenters.length}+</h3>

          <p className="text-base-content/60 mt-2">Active Service Centers</p>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-3xl p-6 shadow-sm">
          <FaTruck className="text-primary text-4xl mb-4" />

          <h3 className="text-3xl font-bold">24/7</h3>

          <p className="text-base-content/60 mt-2">
            Reliable Delivery Operations
          </p>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Search Coverage Area</h2>

          <p className="text-base-content/60 mt-2">
            Search by district name or covered area to quickly locate our
            delivery service availability.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 z-10" />

              <input
                type="search"
                placeholder="Search district or area..."
                className="input input-bordered w-full pl-12 rounded-xl focus:outline-none focus:border-primary"
                {...register("locationName", {
                  required: "Please enter a district name",
                })}
              />
            </div>

            <button type="submit" className="btn btn-primary rounded-xl px-8">
              Search
            </button>
          </div>

          {errors.locationName && (
            <p className="text-error mt-2">{errors.locationName.message}</p>
          )}
        </form>
      </div>

      {/* MAP SECTION */}
      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-base-content">
            Bangladesh Coverage Map
          </h2>

          <p className="text-base-content/60 mt-2">
            Explore all service centers and delivery locations available across
            the country.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-base-300 shadow-xl">
          <MapContainer
            center={position}
            zoom={7.25}
            scrollWheelZoom={true}
            className="h-175 w-full"
            whenReady={(e) => {
              mapRef.current = e.target;
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[Number(center.latitude), Number(center.longitude)]}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="font-bold text-base">{center.district}</h3>

                    <p className="text-sm">{center.covered_area?.join(", ")}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
