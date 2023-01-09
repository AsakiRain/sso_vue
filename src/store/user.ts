import { defineStore } from 'pinia';
import { UserState } from '@/models/user';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({}),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    }
  },
  actions: {
    setInfo(info: Partial<UserState>) {
      this.$patch(info);
    },
    resetInfo() {
      this.$reset();
    },
    async login() {
      // login logic
    },
    async logout() {
      // logout logic
    }

  }
});

export default useUserStore;