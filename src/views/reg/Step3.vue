<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step3</div>
      <div class="step-main-title">创建账号</div>
    </div>
    <div class="step-content">
      <div class="step-description">
        <div>很传统地进行一个账号的创建：</div>
      </div>
      <a-form
        class="step-form"
        :model="accountForm"
        :rules="rules"
        auto-label-width
        @submit-success="handleStepAcount"
      >
        <a-form-item field="username" label="用户名" hide-label>
          <a-input
            v-model="accountForm.username"
            autocomplete="username"
            placeholder="用户名"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="nickname" label="昵称" hide-label>
          <a-input
            v-model="accountForm.nickname"
            autocomplete="nickname"
            placeholder="昵称"
          >
            <template #prefix>
              <icon-at />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" label="密码" hide-label>
          <a-input-password
            v-model="accountForm.password"
            autocomplete="new-password"
            placeholder="密码"
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="password_confirm" label="确认密码" hide-label>
          <a-input-password
            v-model="accountForm.password_confirm"
            autocomplete="one-time-code"
            placeholder="确认密码"
          >
            <template #prefix>
              <icon-refresh />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item field="serial" label="serial" hide-label class="hidden">
          <a-input v-model="accountForm.serial" />
        </a-form-item>
        <div class="flex-padder"></div>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="isLoading">
            下一步
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { AccountForm } from "@/models/reg";
import useSwitch from "@/utils/useSwitch";
import { FieldRule, Message } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import {
  IconUser,
  IconAt,
  IconLock,
  IconRefresh,
} from "@arco-design/web-vue/es/icon";

const router = useRouter();
const { val: isLoading, set: setLoading } = useSwitch(false);

onMounted(() => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
});

const accountForm = reactive<AccountForm>({
  username: "",
  nickname: "",
  password: "",
  password_confirm: "",
  serial: localStorage.reg_serial,
});

const handleStepAcount = async (values: Record<string, any>) => {
  setLoading(true);
  try {
    const res = await reg.postAccountForm({
      username: values.username,
      nickname: values.nickname,
      password: values.password,
      serial: values.serial,
    });
    localStorage.reg_step = 3;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

const rules: Record<string, FieldRule | FieldRule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
    {
      match: /^[a-zA-Z0-9_]{3,20}$/,
      message: "用户名必须为3-20位大小写字母或数字",
    },
  ],
  nickname: [
    {
      required: true,
      message: "请输入昵称",
    },
    {
      match: /^.{1,20}$/,
      message: "昵称必须为1-20位字符",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
    {
      match: /^[\x21-\x7e]{8,36}$/,
      message: "密码必须为8-36位可见ASCII字符",
    },
  ],
  password_confirm: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      validator: async (value, callback) => {
        if (accountForm.password !== value) {
          callback("两次密码输入不一致");
        }
        return Promise.resolve();
      },
    },
  ],
};
</script>

<style>
#code-row {
  display: flex;
  column-gap: 4px;
}
#btn-row {
  justify-self: flex-end;
}
</style>
