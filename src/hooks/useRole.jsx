import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isLoading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    // enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/users/${user?.email}/role`);

      return res.data || "user";
    },
  });

  return { roleLoading, role };
}
