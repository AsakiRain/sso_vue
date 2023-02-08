import axios from "axios";
import type { AxiosResponse } from "axios";
import { Message } from "@arco-design/web-vue";
import type { MyRes } from "@/models";
import router from "@/router";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  // eslint-disable-next-line
  (config: any) => {
    if (!config.headers) config.headers = {};
    // 搞不懂这个类型喵
    config.headers.Authorization = localStorage.getItem("token") || "";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      Message.error(error.message);
    } else {
      if (error.response.status.toString().startsWith(5)) {
        // 若返回5开头的错误，服务器不一定有返回数据，所以额外判断
        Message.error(error.response?.data.message || "服务器错误");
      } else {
        // 对于其他状态码，服务器应当返回错误码和错误信息
        Message.error(
          `${error.response.data.code} ${error.response.data.message}`
        );
        if (error.response.status === 401) {
          // 若返回401，说明是token相关错误，直接跳转到登录页
          router.push("/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

const apiPost = <T = unknown>(
  url: string,
  data?: object,
  config?: object
): Promise<MyRes<T>> => {
  return api.post(url, data, { ...config });
};

const apiGet = <T = unknown>(
  url: string,
  params?: object,
  config?: object
): Promise<MyRes<T>> => {
  return api.get(url, { params, ...config });
};

export { apiPost, apiGet };
