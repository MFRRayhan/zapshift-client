import Loading from "../../../components/Loading";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";
import UserDashboardHome from "./UserDashboardHome";

export default function DashboardHome() {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "rider") {
    return <RiderDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
}
