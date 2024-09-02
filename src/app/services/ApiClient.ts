import axios from "axios";

const API_BASE_URL = "http://localhost:5143/api";
const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 300000,
});
export default ApiClient;
