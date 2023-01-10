import { defineStore } from "pinia";
import { LoginForm, LoginRes, UserState } from "@/models/user";
import user from "@/api/user";
import { message } from "ant-design-vue";
const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    uid: undefined,
    username: undefined,
    nickname: undefined,
    role: undefined,
    email: undefined,
    phone: undefined,
    avatar: undefined,
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
    setInfo(info: Partial<UserState>) {
      this.$patch(info);
    },
    resetInfo() {
      this.$reset();
    },
    async login(loginForm: LoginForm): Promise<boolean> {
      try {
        const res = await user.login(loginForm);
        message.success(res.message);
        localStorage.token = res.data.token;
        return true;
      } catch (error) {
        return false;
      }
    },
    async logout() {
      this.resetInfo();
      localStorage.removeItem("token");
    },
    async info(){
      try {
        const res = await user.info();
        this.setInfo(res.data);
        return true;
      } catch (error) {
        return false;
      }
    }
  },
});

export default useUserStore;
