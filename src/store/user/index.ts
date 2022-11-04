import { apiGet, apiPost } from '@/api/api';
import { defineStore } from 'pinia';
import type { LoginReq, LoginRes } from '@/api/user';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    uid: undefined,
    username: undefined,
    nickname: undefined,
    email: undefined,
    phone: undefined,
    avatar: undefined,
    role: '',
    created_at: undefined,
    updated_at: undefined,
    deleted_at: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    resetInfo() {
      this.$reset();
    },
    async login(loginData: LoginReq) {
      const resp = await apiPost<LoginRes>('/login', loginData);
      const { token } = resp.data;
      localStorage.setItem('token', token);
    },
    logout() {
      localStorage.removeItem('token');
    },
    async info() {
      const resp = await apiGet('/user/info');
      const data = await resp.data;
      this.setInfo(data);
    },
  },
});

export default useUserStore;
