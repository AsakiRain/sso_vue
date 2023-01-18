<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step2</div>
      <div class="step-main-title">验证邮箱</div>
    </div>
    <div class="step-content">
      <div class="step-description">
        <div>请填写邮箱并获取验证码</div>
      </div>
      <a-form
        class="step-form"
        id="email-form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        :model="emailForm"
        :rules="rules"
        @finish="handleStepEmail"
      >
        <a-form-item name="email" label="邮箱">
          <a-input
            v-model:value="emailForm.email"
            placeholder="请输入邮箱"
            autocomplete="email"
          >
            <template #prefix>
              <MailOutlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="code" label="验证码">
          <div id="code-row">
            <a-input
              v-model:value="emailForm.code"
              placeholder="请输入验证码"
              autocompete="one-time-code"
            >
              <template #prefix>
                <NumberOutlined />
              </template>
            </a-input>
            <a-button
              type="primary"
              @click="handleGetCode"
              :loading="isGeting"
              :disabled="isCooling"
            >
              <span v-if="isCooling"> 重新获取({{ timer.num.value }}s) </span>
              <span v-else> 获取验证码 </span>
            </a-button>
          </div>
        </a-form-item>
        <a-form-item hidden name="serial">
          <a-input v-model:value="emailForm.serial" />
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
import { EmailForm } from "@/models/reg";
import useToggle from "@/utils/useToggle";
import { message } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import email from "@/api/email";
import Timer from "@/utils/useTimer";
import { MailOutlined, NumberOutlined } from "@ant-design/icons-vue";
import { Rule } from "ant-design-vue/es/form/interface";

const router = useRouter();
const { val: isLoading, set: setLoading } = useToggle(false);
const { val: isGeting, set: setGeting } = useToggle(false);
const { val: isCooling, set: setCooling } = useToggle(false);

const timer = new Timer({
  name: "email_code",
  memory: true,
  immediate: false,
  num: 60,
  type: "down",
  onStart: () => {
    setCooling(true);
  },
  trigger: (timer: Timer) => {
    return timer.num.value === 0;
  },
  onTrigger: (timer: Timer) => {
    timer.stop();
    setCooling(false);
  },
});

onMounted(() => {
  if (!localStorage.reg_serial) {
    message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
});

const emailForm = reactive<EmailForm>({
  email: "",
  code: "",
  serial: localStorage.reg_serial,
});

const handleGetCode = async () => {
  if (!emailForm.email) {
    message.info("请输入邮箱");
    return;
  }
  setGeting(true);
  try {
    const res = await email.getCode({ email: emailForm.email });
    message.success(res.message);
    timer.reset();
    timer.start();
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setGeting(false);
  }
};

const handleStepEmail = async (emailForm: EmailForm) => {
  setLoading(true);
  try {
    const res = await reg.postEmailForm(emailForm);
    localStorage.reg_step = 2;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

const rules: Record<string, Rule[]> = {
  email: [
    {
      required: true,
      message: "请输入邮箱",
    },
    {
      type: "email",
      message: "请输入正确的邮箱",
    },
  ],
  code: [
    {
      required: true,
      message: "请输入验证码",
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
