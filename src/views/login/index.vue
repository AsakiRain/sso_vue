<template>
  <div id="login-page">
    <div id="brand-wrapper">
      <div id="logo-wrapper">
        <a-avatar :size="100" src="/img/logo.jpg"></a-avatar>
      </div>
      <div id="text-wrapper">
        <div id="main-title">Friendship org</div>
        <div id="sub-title">统一身份认证平台</div>
      </div>
    </div>
    <div id="panel-wrapper">
      <a-tabs type="card" id="login-panel">
        <a-tab-pane key="1" tab="账号登录" class="panel-item">
          <a-form
            id="login-form"
            :form="loginForm"
            :model="loginForm"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 18 }"
            @finish="handleLogin"
          >
            <a-form-item
              label="用户名"
              name="username"
              :rules="[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]"
            >
              <a-input
                autocomplete="username"
                v-model:value="loginForm.username"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item
              label="密码"
              name="password"
              :rules="[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]"
            >
              <a-input
                type="password"
                autocomplete="current-password"
                v-model:value="loginForm.password"
                @keyup.enter="handleLogin"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input>
            </a-form-item>
            <div class="etc-col">
              <a-checkbox>记住我</a-checkbox>
              <a href="/login">忘记密码</a>
            </div>
            <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
              <a-button
                type="primary"
                html-type="submit"
                block
                :loading="isLoading"
                >登录</a-button
              >
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="QQ登录" class="panel-item">
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="WebAuthn登录" class="panel-item">
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoginForm } from "@/models/user";
import { reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import useToggle from "@/utils/useToggle";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const userStore = useUserStore();
const router = useRouter();
const { val: isLoading, set: setLoading } = useToggle(false);
const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
});

const handleLogin = async (loginForm: LoginForm) => {
  setLoading(true);
  if (await userStore.login(loginForm)) {
    router.push("/");
  }
  setLoading(false);
};
</script>
<style lang="css" scoped>
#brand-wrapper {
  display: flex;
  column-gap: 8px;
  align-items: center;
  position: absolute;
  top: 36px;
  left: 48px;
}
#text-wrapper {
  color: #ffffff;
  font-family: Roboto, sans-serif;
  text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.8);
}
#main-title {
  font-size: 48px;
  font-weight: bold;
  line-height: 48px;
}
#sub-title {
  font-size: 24px;
  line-height: 24px;
}

#panel-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  top: 25%;
  right: 160px;
}

#login-panel {
  background-color: var(--backgroud-color);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.6);
}
.panel-item {
  padding: 24px;
  width: 320px;
}

#btn-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.etc-col {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>
