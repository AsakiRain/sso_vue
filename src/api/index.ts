import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import type { MyRes } from "@/models";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token") || "",
  },
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    const tip = `${error.response.status} ${error.response.statusText}`;
    message.error(tip);
    return Promise.reject(tip);
  }
);

const apiPost = <T = any>(
  url: string,
  data?: any,
  config?: any
): Promise<MyRes<T>> => {
  return api.post(url, data, { ...config });
};

const apiGet = <T = any>(
  url: string,
  params?: any,
  config?: any
): Promise<MyRes<T>> => {
  return api.get(url, { params, ...config });
};

export { apiPost, apiGet };
