import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
import type { MyRes } from '@/models';

const api = axios.create({
  baseURL: import.meta.env.MODE == 'dev' ? '' : (import.meta.env.VITE_API_URL || ''),
  timeout: 3000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') || ''
  }
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
    const res = response.data;
    if (res.code !== 200) {
      const tip = res.message || `后端返回码 ${ res.code }`;
      message.error(tip);
      return Promise.reject(tip);
    }
    return res;
  },
  (error) => {
    const tip = `${ error.response.status } ${ error.response.statusText }`;
    message.error(tip);
    return Promise.reject(tip);
  }
);


const apiPost = <T = any>(url: string, data?: any, config?: any): Promise<MyRes<T>> => {
  return api.post(url, data, { ...config });
};

const apiGet = <T = any>(url: string, params?: any, config?: any): Promise<MyRes<T>> => {
  return api.get(url, { params, ...config });
};

export { apiPost, apiGet };