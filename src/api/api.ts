import axios, { AxiosError, AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { Message } from '@arco-design/web-vue';

export interface CommonRes<T = unknown> {
  code: number;
  message: string;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response: AxiosResponse<CommonRes>) => {
    const res = response.data;
    if (res.code !== 200) {
      Message.error({
        content: res.message || 'Error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error: AxiosError) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export const apiGet = (path: string, params?: object, config?: object) => {
  return axios.get(path, { params, ...config });
};

export const apiPost = <T = unknown>(
  path: string,
  data?: object,
  config?: object
) => {
  return axios.post<T>(path, data, config);
};
