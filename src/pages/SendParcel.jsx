import { useForm, useWatch } from "react-hook-form";
import { FaBox, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function SendParcel() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const warehouses = useLoaderData();
  const allRegions = warehouses.map((warehouse) => warehouse.region);
  const uniqueRegions = [...new Set(allRegions)];

  const getDistrictsByRegion = (region) => {
    const warehousesInRegion = warehouses.filter(
      (warehouse) => warehouse.region === region,
    );
    const districts = warehousesInRegion.map((warehouse) => warehouse.district);

    return districts;
  };

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const handleParcel = (data) => {
    const isDocument = data.parcelType === "document";

    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      const baseCost = isSameDistrict ? 110 : 150;

      if (parcelWeight < 3) {
        cost = baseCost;
      } else {
        const minCharge = baseCost;
        const extraWeight = parcelWeight - 3;

        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    const parcelData = {
      ...data,
      cost,
      createdAt: new Date().toISOString(),
      paymentStatus: "unpaid",
    };

    Swal.fire({
      title: "Confirm Parcel Booking",
      html: `
      <div style="text-align:left">
        <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
        <p><strong>Delivery Cost:</strong> ৳${cost}</p>
        <p><strong>Sender District:</strong> ${data.senderDistrict}</p>
        <p><strong>Receiver District:</strong> ${data.receiverDistrict}</p>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Confirm Booking",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", parcelData).then((res) => {
          if (res.data.result.insertedId) {
            Swal.fire({
              title: "Booking Confirmed!",
              text: "Your parcel booking has been placed successfully.",
              icon: "success",
              confirmButtonColor: "#16a34a",
            });
          }
        });

        reset();
      }
    });
  };

  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-base-content">Send A Parcel</h2>

        <p className="text-gray-500 mt-2">
          Fill in the details carefully for smooth delivery service.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleParcel)} className="space-y-8">
        <fieldset className="fieldset">
          {/* ========================= */}
          {/* Parcel Information */}
          {/* ========================= */}

          <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6 md:p-8 mb-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <FaBox size={20} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">Parcel Information</h3>

                <p className="text-sm text-gray-500">
                  Basic parcel details and shipment type.
                </p>
              </div>
            </div>

            {/* Parcel Type */}
            <div className="mb-8">
              <label className="block font-medium mb-3">Parcel Type</label>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-3 border border-base-300 rounded-2xl px-5 py-4 cursor-pointer hover:border-primary transition-all duration-300">
                  <input
                    {...register("parcelType", {
                      required: "Please select parcel type",
                    })}
                    type="radio"
                    value="document"
                    className="radio radio-secondary"
                    defaultChecked
                  />

                  <span className="font-medium">Document</span>
                </label>

                <label className="flex items-center gap-3 border border-base-300 rounded-2xl px-5 py-4 cursor-pointer hover:border-primary transition-all duration-300">
                  <input
                    {...register("parcelType", {
                      required: "Please select parcel type",
                    })}
                    type="radio"
                    value="non-document"
                    className="radio radio-secondary"
                  />

                  <span className="font-medium">Non-Document</span>
                </label>
              </div>

              {errors.parcelType && (
                <p className="text-error text-sm mt-2">
                  {errors.parcelType.message}
                </p>
              )}
            </div>

            {/* Parcel Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parcel Name */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium">Parcel Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter parcel name"
                  {...register("parcelName", {
                    required: "Parcel name is required",
                  })}
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.parcelName ? "input-error" : ""
                  }`}
                />

                {errors.parcelName && (
                  <p className="text-error text-sm mt-2">
                    {errors.parcelName.message}
                  </p>
                )}
              </div>

              {/* Parcel Weight */}
              <div>
                <label className="label mb-1">
                  <span className="label-text font-medium">
                    Parcel Weight (KG)
                  </span>
                </label>

                <input
                  type="number"
                  step="0.1"
                  placeholder="Enter parcel weight"
                  {...register("parcelWeight", {
                    required: "Parcel weight is required",
                  })}
                  className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                    errors.parcelWeight ? "input-error" : ""
                  }`}
                />

                {errors.parcelWeight && (
                  <p className="text-error text-sm mt-2">
                    {errors.parcelWeight.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Sender & Receiver         */}
          {/* ========================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sender Section */}
            <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FaUser size={18} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">Sender Information</h3>

                  <p className="text-sm text-gray-500">
                    Pickup location and sender details.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Sender Name */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">Sender Name</span>
                  </label>

                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    readOnly
                    placeholder="Sender full name"
                    {...register("senderName", {
                      required: "Sender name is required",
                    })}
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.senderName ? "input-error" : ""
                    }`}
                  />

                  {errors.senderName && (
                    <p className="text-error text-sm mt-2">
                      {errors.senderName.message}
                    </p>
                  )}
                </div>

                {/* Sender email */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Sender Email (optional)
                    </span>
                  </label>

                  <input
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    placeholder="Sender email"
                    {...register("senderEmail")}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />

                  {errors.senderEmail && (
                    <p className="text-error text-sm mt-2">
                      {errors.senderEmail.message}
                    </p>
                  )}
                </div>

                {/* Sender Address */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">Address</span>
                  </label>

                  <textarea
                    placeholder="Pickup address"
                    {...register("senderAddress", {
                      required: "Address is required",
                    })}
                    className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                      errors.senderAddress ? "textarea-error" : ""
                    }`}
                  />

                  {errors.senderAddress && (
                    <p className="text-error text-sm mt-2">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>

                {/* Sender Phone */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Contact Number
                    </span>
                  </label>

                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    {...register("senderPhone", {
                      required: "Phone number is required",
                    })}
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.senderPhone ? "input-error" : ""
                    }`}
                  />

                  {errors.senderPhone && (
                    <p className="text-error text-sm mt-2">
                      {errors.senderPhone.message}
                    </p>
                  )}
                </div>

                {/* Sender Region */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">Your Region</span>
                  </label>

                  <select
                    defaultValue=""
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    {...register("senderRegion", {
                      required: "Please select a region",
                    })}
                  >
                    <option value="" disabled>
                      Pick a Region
                    </option>

                    {uniqueRegions.map((region, i) => (
                      <option key={i}>{region}</option>
                    ))}
                  </select>

                  {errors.senderRegion && (
                    <p className="form-error">{errors.senderRegion.message}</p>
                  )}
                </div>

                {/* Sender District */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Your District
                    </span>
                  </label>

                  <select
                    defaultValue=""
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    {...register("senderDistrict", {
                      required: "Please select a district",
                    })}
                  >
                    <option value="" disabled>
                      Pick a District
                    </option>

                    {getDistrictsByRegion(senderRegion).map((district, i) => (
                      <option key={i}>{district}</option>
                    ))}
                  </select>

                  {errors.senderDistrict && (
                    <p className="form-error">
                      {errors.senderDistrict.message}
                    </p>
                  )}
                </div>

                {/* Pickup Instructions */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Pickup Instructions
                    </span>
                  </label>

                  <textarea
                    placeholder="Pickup Instructions"
                    {...register("pickupInstructions", {
                      required: "Pickup instructions is required",
                    })}
                    className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                      errors.pickupInstructions ? "textarea-error" : ""
                    }`}
                  />

                  {errors.pickupInstructions && (
                    <p className="text-error text-sm mt-2">
                      {errors.pickupInstructions.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Receiver Section */}
            <div className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FaMapMarkerAlt size={18} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold">
                    Receiver Information
                  </h3>

                  <p className="text-sm text-gray-500">
                    Delivery destination and receiver details.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Receiver Name */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Receiver Name
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Receiver full name"
                    {...register("receiverName", {
                      required: "Receiver name is required",
                    })}
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.receiverName ? "input-error" : ""
                    }`}
                  />

                  {errors.receiverName && (
                    <p className="text-error text-sm mt-2">
                      {errors.receiverName.message}
                    </p>
                  )}
                </div>

                {/* Receiver email */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Receiver Email (optional)
                    </span>
                  </label>

                  <input
                    type="email"
                    placeholder="Receiver email"
                    {...register("receiverEmail")}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Receiver Address */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Delivery Address
                    </span>
                  </label>

                  <textarea
                    placeholder="Receiver address"
                    {...register("receiverAddress", {
                      required: "Receiver address is required",
                    })}
                    className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                      errors.receiverAddress ? "textarea-error" : ""
                    }`}
                  />

                  {errors.receiverAddress && (
                    <p className="text-error text-sm mt-2">
                      {errors.receiverAddress.message}
                    </p>
                  )}
                </div>

                {/* Receiver Phone */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Contact Number
                    </span>
                  </label>

                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    {...register("receiverPhone", {
                      required: "Phone number is required",
                    })}
                    className={`input input-bordered w-full focus:outline-none focus:border-primary ${
                      errors.receiverPhone ? "input-error" : ""
                    }`}
                  />

                  {errors.receiverPhone && (
                    <p className="text-error text-sm mt-2">
                      {errors.receiverPhone.message}
                    </p>
                  )}
                </div>

                {/* Receiver Region */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Receiver Region
                    </span>
                  </label>

                  <select
                    defaultValue=""
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    {...register("receiverRegion", {
                      required: "Please select a region",
                    })}
                  >
                    <option value="" disabled>
                      Pick a Region
                    </option>

                    {uniqueRegions.map((region, i) => (
                      <option key={i}>{region}</option>
                    ))}
                  </select>

                  {errors.receiverRegion && (
                    <p className="form-error">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </div>

                {/* Receiver District */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Receiver District
                    </span>
                  </label>

                  <select
                    defaultValue=""
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                    {...register("receiverDistrict", {
                      required: "Please select a district",
                    })}
                  >
                    <option value="" disabled>
                      Pick a District
                    </option>

                    {getDistrictsByRegion(receiverRegion).map((district, i) => (
                      <option key={i}>{district}</option>
                    ))}
                  </select>

                  {errors.receiverDistrict && (
                    <p className="form-error">
                      {errors.receiverDistrict.message}
                    </p>
                  )}
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text font-medium">
                      Delivery Instructions
                    </span>
                  </label>

                  <textarea
                    placeholder="Delivery Instructions"
                    {...register("deliveryInstructions", {
                      required: "Delivery instructions is required",
                    })}
                    className={`textarea textarea-bordered w-full focus:outline-none focus:border-primary ${
                      errors.deliveryInstructions ? "textarea-error" : ""
                    }`}
                  />

                  {errors.deliveryInstructions && (
                    <p className="text-error text-sm mt-2">
                      {errors.deliveryInstructions.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Proceed to Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}
