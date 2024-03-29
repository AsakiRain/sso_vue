import { apiGet, apiPost } from "@/api/index";
import { MyRes } from "@/models";
import type { UserInfo, LoginForm, LoginRes } from "@/models/user";
import { Message } from "@arco-design/web-vue";

const login = async (loginForm: LoginForm): Promise<MyRes<LoginRes>> => {
  const res = await apiPost<LoginRes>("/login", loginForm);
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

const info = async (): Promise<MyRes<UserInfo>> => {
  const res = await apiGet<UserInfo>("/user/info");
  if (res.code !== 20000) {
    Message.error(res.message);
    return Promise.reject(res.message);
  }
  return res;
};

export default {
  login,
  info,
};
