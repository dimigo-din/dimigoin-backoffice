import axios from "axios";

const defaultClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default defaultClient;
