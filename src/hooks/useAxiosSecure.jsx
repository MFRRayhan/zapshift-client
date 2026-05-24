import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

export default function useAxiosSecure() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user?.accessToken}`;
        }

        return config;
      },
      (err) => {
        console.error("request error", err);
        return Promise.reject(err);
      },
    );

    const resInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          logout()
            .then(() => {
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        return Promise.reject(err);
      },
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, navigate, logout]);

  return instance;
}
