import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Forbidden";

export default function AdminRoute({ children }) {
  const { role, roleLoading } = useRole();
  const { loading } = useAuth();

  if (loading || roleLoading) return <Loading />;
  if (role !== "admin") return <Forbidden />;

  return children;
}
