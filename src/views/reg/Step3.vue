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
        id="account-form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        :model="accountForm"
        :rules="rules"
        @finish="handleStepAcount"
      >
        <a-form-item name="username" label="用户名">
          <a-input v-model:value="accountForm.username" autocomplete="username">
            <template #prefix>
              <UserOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="nickname" label="昵称">
          <a-input v-model:value="accountForm.nickname" autocomplete="nickname">
            <template #prefix>
              <TeamOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password" label="密码">
          <a-input-password
            v-model:value="accountForm.password"
            autocomplete="new-password"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item name="password_confirm" label="确认密码">
          <a-input-password
            v-model:value="accountForm.password_confirm"
            autocomplete="one-time-code"
          >
            <template #prefix>
              <ReloadOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item hidden name="serial">
          <a-input v-model:value="accountForm.serial" />
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
import { AccountForm, EmailForm } from "@/models/reg";
import useToggle from "@/utils/useToggle";
import { message } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import {
  UserOutlined,
  TeamOutlined,
  LockOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { Rule } from "ant-design-vue/es/form/interface";

const router = useRouter();
const { val: isLoading, set: setLoading } = useToggle(false);

onMounted(() => {
  if (!localStorage.reg_serial) {
    message.info("没有记录的流水号，需要从头开始注册");
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

const handleStepAcount = async (emailForm: EmailForm) => {
  setLoading(true);
  console.log(emailForm);
  try {
    const res = await reg.postAccountForm({
      username: accountForm.username,
      nickname: accountForm.nickname,
      password: accountForm.password,
      serial: accountForm.serial,
    });
    localStorage.reg_step = 3;
    router.push(res.data.url);
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      message: "请输入用户名",
    },
    {
      pattern: /^[a-zA-Z0-9_]{3,20}$/,
      message: "用户名必须为3-20位大小写字母或数字",
    },
  ],
  nickname: [
    {
      required: true,
      message: "请输入昵称",
    },
    {
      pattern: /^.{1,20}$/,
      message: "昵称必须为1-20位字符"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
    },
    {
      pattern: /^[\x21-\x7e]{8,36}$/,
      message: "密码必须为8-36位可见ASCII字符",
    },
  ],
  password_confirm: [
    {
      required: true,
      message: "请再次输入密码",
    },
    {
      validator: (rule, value, callback) => {
        if (accountForm.password !== accountForm.password_confirm) {
          callback("两次密码输入不一致");
        } else {
          callback();
        }
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
