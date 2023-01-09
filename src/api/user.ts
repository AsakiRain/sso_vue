import { apiGet, apiPost } from '@/api/index';
import { MyRes } from '@/models';
import type { UserInfo, LoginForm, LoginRes } from '@/models/user';


const login = async (loginForm: LoginForm): Promise<MyRes<LoginRes>> => {
  const res = await apiPost('/login', loginForm);
  return res.data;
};

const info = async (): Promise<MyRes<UserInfo>> => {
  const res = await apiGet('/user/info');
  return res.data;
};