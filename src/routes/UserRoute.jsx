import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../pages/Forbidden";

export default function UserRoute({ children }) {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (!user || loading || roleLoading) {
    return <Loading />;
  }

  if (role !== "user") {
    return <Forbidden />;
  }

  return children;
}
