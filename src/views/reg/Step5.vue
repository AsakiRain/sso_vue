<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step5</div>
      <div class="step-main-title">认证QQ</div>
    </div>
    <div class="step-content">
      <div class="step-description">
        <div>这个步骤的指导怎么写怎么抽象</div>
        <div>所以我就不写了，乐</div>
      </div>
      <a-form :model="qqForm" :rules="qqRules" class="step-form">
        <a-form-item field="qq" label="QQ号" hide-label>
          <div class="flex gap-x-2 flex-grow">
            <a-input
              v-model="qqForm.qq"
              placeholder="请输入QQ号"
              autocomplete="qq"
            >
              <template #prefix>
                <icon-email />
              </template>
            </a-input>
            <a-button
              type="primary"
              html-type="submit"
              @click="handleGetCode"
              :loading="isPending"
            >
              获取验证码
            </a-button>
          </div>
        </a-form-item>
      </a-form>
      <a-form
        class="step-form"
        :model="serialForm"
        @submit-success="handleStepQq"
      >
        <div class="flex-padder"></div>
        <a-form-item field="serial" label="serial" hide-label class="hidden">
          <a-input v-model="serialForm.serial" />
        </a-form-item>
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
import { QqForm, SerialForm } from "@/models/reg";
import useSwitch from "@/utils/useSwitch";
import { FieldRule, Message } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import { IconEmail } from "@arco-design/web-vue/es/icon";
import qq from "@/api/qq";

const router = useRouter();
const { val: isLoading, set: setLoading } = useSwitch(false);
const { val: isPending, set: setPending } = useSwitch(false);

const qqForm = reactive<QqForm>({
  qq: "",
});

const serialForm = reactive<SerialForm>({
  serial: localStorage.reg_serial,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleGetCode = async (values: Record<string, any>) => {
  try {
    setPending(true);
    const res = await qq.getCode(values as QqForm);
    Message.success(res.message);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setPending(false);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleStepQq = async (values: Record<string, any>) => {
  setLoading(true);
  try {
    const res = await reg.postQqForm(values as SerialForm);
    localStorage.reg_step = 5;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

const qqRules: Record<string, FieldRule | FieldRule[]> = {
  email: [
    {
      required: true,
      message: "请输入QQ号",
    },
    {
      type: "number",
      message: "请输入正确的QQ号",
    },
  ],
};

onMounted(() => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
});
</script>

<style></style>
