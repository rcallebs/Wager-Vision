import Axios from "axios";

export const BASE_URL = "https://wager-server-946d5db015ae.herokuapp.com";

const Client = Axios.create({ baseURL: BASE_URL });

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    // config.headers["Content-Type"] = `application/json`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Client;
