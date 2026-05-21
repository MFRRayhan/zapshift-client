import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
  const authInfo = useContext(AuthContext);
  return authInfo;
}
