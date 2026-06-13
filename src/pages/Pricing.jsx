import { useState } from "react";
import { FaCalculator, FaMoneyBillWave } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";

export default function PricingCalculator() {
  const warehouses = useLoaderData();

  const [parcelType, setParcelType] = useState("");
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [senderDistrict, setSenderDistrict] = useState("");
  const [receiverDistrict, setReceiverDistrict] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);

  // =========================
  // REGION LIST (dynamic)
  // =========================
  const allRegions = warehouses.map((w) => w.region);
  const uniqueRegions = [...new Set(allRegions)];

  // =========================
  // DISTRICT FILTER
  // =========================
  const getDistrictsByRegion = (region) => {
    return warehouses.filter((w) => w.region === region).map((w) => w.district);
  };

  // =========================
  // CALCULATION (SendParcel logic)
  // =========================
  const handleCalculate = () => {
    const isDocument = parcelType === "document";
    const isSameDistrict = senderDistrict === receiverDistrict;
    const parcelWeight = parseFloat(weight || 0);

    let cost = 0;

    // DOCUMENT RULE
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    }

    // NON-DOCUMENT RULE
    else {
      const baseCost = isSameDistrict ? 110 : 150;

      if (parcelWeight < 3) {
        cost = baseCost;
      } else {
        const extraWeight = parcelWeight - 3;

        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = baseCost + extraCharge;
      }
    }

    setPrice(cost);
  };

  const handleReset = () => {
    setParcelType("");
    setSenderRegion("");
    setReceiverRegion("");
    setSenderDistrict("");
    setReceiverDistrict("");
    setWeight("");
    setPrice(0);
  };

  return (
    <div className="container py-10">
      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-base-content">
          Pricing Calculator
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl">
          Calculate delivery cost using real warehouse data with SendParcel
          pricing logic based on region, district and parcel type.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-base-100 border border-base-300 rounded-3xl shadow-sm p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT FORM */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FaCalculator />
              </div>
              <div>
                <h3 className="text-2xl font-semibold">
                  Calculate Delivery Cost
                </h3>
                <p className="text-sm text-gray-500">
                  Powered by warehouse-based routing system
                </p>
              </div>
            </div>

            {/* Parcel Type */}
            <div>
              <label className="font-medium mb-2 block">Parcel Type</label>
              <select
                value={parcelType}
                onChange={(e) => setParcelType(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-2"
              >
                <option value="">Select Type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
            </div>

            {/* Sender Region */}
            <div>
              <label className="font-medium mb-2 block">Sender Region</label>
              <select
                value={senderRegion}
                onChange={(e) => setSenderRegion(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-2"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sender District */}
            <div>
              <label className="font-medium mb-2 block">Sender District</label>
              <select
                value={senderDistrict}
                onChange={(e) => setSenderDistrict(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-2"
              >
                <option value="">Select District</option>
                {getDistrictsByRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Receiver Region */}
            <div>
              <label className="font-medium mb-2 block">Receiver Region</label>
              <select
                value={receiverRegion}
                onChange={(e) => setReceiverRegion(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-2"
              >
                <option value="">Select Region</option>
                {uniqueRegions.map((region, i) => (
                  <option key={i} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Receiver District */}
            <div>
              <label className="font-medium mb-2 block">
                Receiver District
              </label>
              <select
                value={receiverDistrict}
                onChange={(e) => setReceiverDistrict(e.target.value)}
                className="select select-bordered w-full focus:outline-none focus:border-primary focus:ring-2"
              >
                <option value="">Select District</option>
                {getDistrictsByRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="font-medium mb-2 block">Weight (KG)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter weight"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="btn btn-outline btn-primary flex-1"
              >
                Reset
              </button>

              <button
                onClick={handleCalculate}
                className="btn btn-primary flex-1"
              >
                Calculate
              </button>
            </div>
          </div>

          {/* RIGHT RESULT */}
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-gray-500 mb-4">Estimated Delivery Cost</p>

            <div className="text-6xl md:text-8xl font-bold text-primary flex items-center gap-3">
              {price}

              <span className="text-primary text-4xl md:text-5xl">
                <FaBangladeshiTakaSign />
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-4 max-w-xs">
              Cost is calculated dynamically using real warehouse routing data
              and SendParcel pricing rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
