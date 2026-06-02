import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function AssignRiders() {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["riders", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?deliveryStatus=pending_pickup`,
      );
      return res.data;
    },
  });

  console.log(data);

  return <div>AssignRiders</div>;
}
