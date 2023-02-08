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
        :model="emailForm"
        :rules="rules"
        @submit-success="handleStepEmail"
      >
        <a-form-item field="email" label="邮箱" hide-label>
          <a-input
            v-model="emailForm.email"
            placeholder="请输入邮箱"
            autocomplete="email"
          >
            <template #prefix>
              <icon-email />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="code" label="验证码" hide-label>
          <div class="flex gap-x-2 flex-grow">
            <a-input
              v-model="emailForm.code"
              placeholder="请输入验证码"
              autocompete="one-time-code"
              class="flex-grow"
            >
              <template #prefix>
                <icon-code />
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
        <a-form-item field="serial" hide-label class="hidden">
          <a-input v-model="emailForm.serial" />
        </a-form-item>
        <div class="flex-padder"></div>
        <a-form-item hide-label>
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
import { FieldRule, Message } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import email from "@/api/email";
import Timer from "@/utils/useTimer";
import { IconEmail, IconCode } from "@arco-design/web-vue/es/icon";

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
    Message.info("没有记录的流水号，需要从头开始注册");
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
    Message.info("请输入邮箱");
    return;
  }
  setGeting(true);
  try {
    const res = await email.getCode({ email: emailForm.email });
    Message.success(res.message);
    timer.reset();
    timer.start();
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setGeting(false);
  }
};

const handleStepEmail = async (values: Record<string, any>) => {
  setLoading(true);
  try {
    const res = await reg.postEmailForm(values as EmailForm);
    localStorage.reg_step = 2;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

const rules: Record<string, FieldRule | FieldRule[]> = {
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

<style></style>
