import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import type { MyRes } from "@/models";
import router from "@/router";

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
  (error: any) => {
    if (error.response.status.toString().startsWith(5)) {
      // 若返回5开头的错误，服务器不一定有返回数据，所以额外判断
      message.error(error.response?.data.message || "服务器错误");
    } else {
      // 对于其他状态码，服务器应当返回错误码和错误信息
      message.error(
        `${error.response.data.code} ${error.response.data.message}`
      );
      if (error.response.status === 401) {
        // 若返回401，说明是token相关错误，直接跳转到登录页
        router.push("/login");
      }
    }
    return Promise.reject(error);
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
