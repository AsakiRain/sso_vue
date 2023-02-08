<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex gap-x-2 items-center absolute top-9 left-12">
      <div id="logo-wrapper">
        <a-avatar :size="100" image-url="/img/logo.jpg"></a-avatar>
      </div>
      <div
        id="text-wrapper"
        class="font-sans text-white dark:(text-dark-title)"
      >
        <div class="text-5xl font-bold">Friendship org</div>
        <div class="text-2xl">统一身份认证平台</div>
      </div>
    </div>
    <a-tabs
      class="absolute right-40 shadow-2xl w-80 top-1/4 bg-light dark:(bg-dark)"
    >
      <a-tab-pane key="1" title="账号登录" class="panel-item">
        <a-form
          :model="loginForm"
          auto-label-width
          @submit-success="handeLogin"
          :rules="rules"
        >
          <a-form-item label="用户名" field="username" hide-label>
            <a-input
              v-model="loginForm.username"
              placeholder="用户名"
              autocomplete="username"
              allow-clear
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码" field="password" hide-label>
            <a-input-password
              v-model="loginForm.password"
              placeholder="密码"
              autocomplete="current-password"
              invisible-button
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <div class="flex justify-between mb-3">
            <a-checkbox>记住我</a-checkbox>
            <a @click="$router.push('/login')">忘记密码</a>
          </div>
          <div class="flex flex-col gap-y-2">
            <a-button
              type="primary"
              html-type="submit"
              :loading="isLoading"
              block
            >
              登录
            </a-button>
            <a-button block @click="$router.push('/reg')">注册</a-button>
          </div>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" title="QQ登录" class="panel-item">
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane key="3" title="WebAuthn登录" class="panel-item">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { LoginForm } from "@/models/user";
import { reactive } from "vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";
import useToggle from "@/utils/useToggle";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
import { FieldRule, ValidatedError } from "@arco-design/web-vue";

const userStore = useUserStore();
const router = useRouter();

const { val: isLoading, set: setLoading } = useToggle(false);
const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
});

const handeLogin = async (values: Record<string, any>) => {
  setLoading(true);
  if (await userStore.login(values as LoginForm)) {
    router.push("/");
  }
  setLoading(false);
};

const rules: Record<string, FieldRule | FieldRule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
  ],
};
</script>
<style lang="css" scoped>
#text-wrapper {
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8);
}
.panel-item {
  @apply pb-4 px-6;
}
</style>
