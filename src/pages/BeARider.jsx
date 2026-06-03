import { useForm, useWatch } from "react-hook-form";
import {
  FaIdCard,
  FaMotorcycle,
  FaPhoneAlt,
  FaRegAddressCard,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import beARider from "../assets/img/agent-pending.png";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function BeARider() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const warehouses = useLoaderData();

  const allRegions = warehouses.map((warehouse) => warehouse.region);
  const uniqueRegions = [...new Set(allRegions)];

  const selectedRegion = useWatch({ control, name: "region" }) || "";

  const getDistrictsByRegion = (region) => {
    const warehousesInRegion = warehouses.filter(
      (warehouse) => warehouse.region === region,
    );

    return warehousesInRegion.map((warehouse) => warehouse.district);
  };

  const handleRiderForm = (data) => {
    console.log(data);
    const riderInfo = {
      ...data,
      status: "pending",
      workStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    axiosSecure
      .post("/riders", riderInfo)
      .then((result) => {
        if (result.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application Submitted Successfully",
            text: "Our team will review your request within 72 hours.",
            confirmButtonColor: "#16a34a",
          });

          reset();
        }
      })
      .catch((err) => {
        console.error("Rider form error:", err);

        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again later.",
          confirmButtonColor: "#dc2626",
        });
      });
  };

  return (
    <section className="container py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-base-content">Become A Rider</h2>

        <p className="text-gray-500 mt-2">
          Join our delivery network and start delivering parcels efficiently
          with flexible working opportunities.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* FORM */}
        <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6 md:p-8">
          {/* FORM HEADER */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
              <FaMotorcycle size={20} />
            </div>

            <div>
              <h3 className="text-2xl font-semibold">Tell Us About Yourself</h3>

              <p className="text-sm text-gray-500">
                Fill in your information carefully to apply as a rider.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleRiderForm)}>
            <fieldset className="fieldset space-y-6">
              {/* Name */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaUser />
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  defaultValue={user?.displayName}
                  readOnly
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.riderName ? "input-error" : ""
                  }`}
                  {...register("riderName", {
                    required: "Rider name is required",
                  })}
                />

                {errors.riderName && (
                  <p className="text-error text-sm mt-2">
                    {errors.riderName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium flex items-center gap-2">
                    <MdEmail />
                    Email Address
                  </span>
                </label>

                <input
                  type="email"
                  defaultValue={user?.email}
                  readOnly
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.riderEmail ? "input-error" : ""
                  }`}
                  {...register("riderEmail", {
                    required: "Email is required",
                  })}
                />

                {errors.riderEmail && (
                  <p className="text-error text-sm mt-2">
                    {errors.riderEmail.message}
                  </p>
                )}
              </div>

              {/* Region + District */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Region */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MdLocationOn />
                      Region
                    </span>
                  </label>

                  <select
                    defaultValue=""
                    className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                      errors.region ? "select-error" : ""
                    }`}
                    {...register("region", {
                      required: "Please select a region",
                    })}
                  >
                    <option value="" disabled>
                      Select Region
                    </option>

                    {uniqueRegions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>

                  {errors.region && (
                    <p className="text-error text-sm mt-2">
                      {errors.region.message}
                    </p>
                  )}
                </div>

                {/* District */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MdLocationOn />
                      District
                    </span>
                  </label>

                  <select
                    defaultValue=""
                    className={`select select-bordered w-full focus:outline-none focus:border-primary ${
                      errors.district ? "select-error" : ""
                    }`}
                    {...register("district", {
                      required: "Please select a district",
                    })}
                  >
                    <option value="" disabled>
                      Select District
                    </option>

                    {getDistrictsByRegion(selectedRegion).map(
                      (district, index) => (
                        <option key={index}>{district}</option>
                      ),
                    )}
                  </select>

                  {errors.district && (
                    <p className="text-error text-sm mt-2">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* DL + NID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DL */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaIdCard />
                      Driving License No.
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter driving license number"
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.dlNo ? "input-error" : ""
                    }`}
                    {...register("dlNo", {
                      required: "Driving license number is required",
                    })}
                  />

                  {errors.dlNo && (
                    <p className="text-error text-sm mt-2">
                      {errors.dlNo.message}
                    </p>
                  )}
                </div>

                {/* NID */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaRegAddressCard />
                      NID Number
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter NID number"
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.nidNo ? "input-error" : ""
                    }`}
                    {...register("nidNo", {
                      required: "NID number is required",
                    })}
                  />

                  {errors.nidNo && (
                    <p className="text-error text-sm mt-2">
                      {errors.nidNo.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaPhoneAlt />
                    Phone Number
                  </span>
                </label>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.phoneNumber ? "input-error" : ""
                  }`}
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />

                {errors.phoneNumber && (
                  <p className="text-error text-sm mt-2">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Bike Info */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaMotorcycle />
                    Bike Information
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Bike brand, model & year"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.bikeInfo ? "input-error" : ""
                  }`}
                  {...register("bikeInfo", {
                    required: "Bike information is required",
                  })}
                />

                {errors.bikeInfo && (
                  <p className="text-error text-sm mt-2">
                    {errors.bikeInfo.message}
                  </p>
                )}
              </div>

              {/* Bike Registration */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium">
                    Bike Registration Number
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Enter bike registration number"
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.regNo ? "input-error" : ""
                  }`}
                  {...register("regNo", {
                    required: "Bike registration number is required",
                  })}
                />

                {errors.regNo && (
                  <p className="text-error text-sm mt-2">
                    {errors.regNo.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium">
                    Why Do You Want To Join?
                  </span>
                </label>

                <textarea
                  rows={5}
                  placeholder="Tell us about yourself..."
                  className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                    errors.desc ? "textarea-error" : ""
                  }`}
                  {...register("desc", {
                    required: "Description is required",
                  })}
                ></textarea>

                {errors.desc && (
                  <p className="text-error text-sm mt-2">
                    {errors.desc.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button className="btn btn-primary">
                  Submit Rider Application
                </button>
              </div>
            </fieldset>
          </form>
        </div>

        {/* IMAGE SIDE */}
        <div className="hidden lg:flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>

            <img
              src={beARider}
              alt="Be A Rider"
              className="relative z-10 w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
