import axios from "axios";

export default function useAxios() {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_SITE_DOMAIN,
  });

  return instance;
}
