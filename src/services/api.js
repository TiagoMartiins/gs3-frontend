import axios from "axios";
import { getToken } from "./auth";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Authorization';
axios.defaults.headers.post['Access-Control-Expose-Headers'] = 'Authorization, teste';

const api = axios.create({
  baseURL: "http://localhost:8080/gs3-api/"
});



api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default api;