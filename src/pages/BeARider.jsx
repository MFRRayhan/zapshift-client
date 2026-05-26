import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import beARider from "../assets/img/agent-pending.png";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function BeARider() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const handleRiderForm = (data) => {
    axiosSecure
      .post("/riders", data)
      .then((result) => {
        if (result.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Your request has been processed. We will back to you on 72 hours",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        reset();
      })
      .catch((err) => {
        console.error("Rider form error:", err);
      });
  };

  return (
    <div>
      <h2>Be a rider</h2>
      <p>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      <h3>Tell Us About Yourself</h3>

      <div className="grid grid-cols-2 gap-10 items-center justify-center">
        <form onSubmit={handleSubmit(handleRiderForm)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("riderName", { required: "Rider name is required" })}
            />

            {errors.riderName && (
              <p className="text-red-500 mt-1">{errors.riderName.message}</p>
            )}

            {/* add driving license no */}
            <label className="label">DL No.</label>
            <input
              type="text"
              className="input w-full"
              {...register("dlNo", {
                required: "Driving license number is required",
              })}
            />
            {errors.dlNo && (
              <p className="text-red-500 mt-1">{errors.dlNo.message}</p>
            )}

            {/* your mail */}
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              {...register("riderEmail", { required: "Email is required" })}
            />
            {errors.riderEmail && (
              <p className="to-red-500 mt-1">{errors.riderEmail.message}</p>
            )}
            {/* your region */}
            {/* district */}
            {/* nid no */}
            <label className="label">NID No.</label>
            <input
              type="text"
              className="input w-full"
              {...register("nidNo", { required: "nid no is required" })}
            />
            {errors.nidNo && (
              <p className="text-red-500">{errors.nidNo.message}</p>
            )}

            {/* phone no */}
            <label className="label">Phone No.</label>
            <input
              type="text"
              className="input w-full"
              {...register("phnNmbr", { required: "Phone nmbr is required" })}
            />
            {errors.phnNmbr && (
              <p className="text-red-500">{errors.phnNmbr.message}</p>
            )}

            {/* Bike brand, model and year */}
            <label className="label">Bike brand, model and year</label>
            <input
              type="text"
              className="input w-full"
              {...register("bikeInfo", { required: "Bike info is required" })}
            />
            {errors.bikeInfo && (
              <p className="text-red-500 mt-1">{errors.bikeInfo.message}</p>
            )}

            {/* bike reg no */}
            <label className="label">Bike Reg No.</label>
            <input
              type="text"
              className="input w-full"
              {...register("regNo", { required: "reg no is required" })}
            />
            {errors.regNo && (
              <p className="text-red-500 mt-1">{errors.regNo.message}</p>
            )}

            {/* tell us about urself */}
            <label className="label">Message:</label>
            <textarea
              className="textarea w-full"
              {...register("desc", { required: "desc is required" })}
            ></textarea>
            {errors.desc && (
              <p className="text-red-500 mt-1">{errors.desc.message}</p>
            )}

            {/* full width submit btn */}
            <button className="btn btn-primary w-full">Submit</button>
          </fieldset>
        </form>

        <img src={beARider} alt="" />
      </div>
    </div>
  );
}
