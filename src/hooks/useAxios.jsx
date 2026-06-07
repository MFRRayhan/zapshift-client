import axios from "axios";

export default function useAxios() {
  const instance = axios.create({
    baseURL: "http://localhost:4000",
  });

  return instance;
}
