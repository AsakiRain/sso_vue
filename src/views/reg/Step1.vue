<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step1</div>
      <div class="step-main-title">用户条款</div>
    </div>
    <div class="step-content">
      <div class="step-description">请阅读并同意以下的用户条款：</div>
      <a-list>
        <a-list-item v-for="item in data" :key="item.title">
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.link" target="_blank">{{ item.title }}</a>
            </template>
            <template #avatar>
              <icon-file :size="24" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
      <div class="flex-padder"></div>
      <a-form
        class="flex-grow"
        id="tos-form"
        :model="tosForm"
        @submit-success="handleStepTos"
      >
        <a-form-item
          field="accept_tos"
          hide-label
          :rules="[
            {
              required: true,
              message: '请阅读并同意以上条款',
            },
          ]"
        >
          <a-checkbox v-model="tosForm.accept_tos">
            我已阅读并同意以上条款
          </a-checkbox>
        </a-form-item>
        <a-form-item field="serial" label="serial" hide-label class="hidden">
          <a-input v-model="tosForm.serial" />
        </a-form-item>
        <a-button
          class="self-start"
          type="primary"
          html-type="submit"
          :disabled="!tosForm.accept_tos"
          :loading="isLoading"
        >
          下一步
        </a-button>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { TosForm } from "@/models/reg";
import useSwitch from "@/utils/useSwitch";
import { Message } from "@arco-design/web-vue";
import { IconFile } from "@arco-design/web-vue/es/icon";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
const router = useRouter();
const { val: isLoading, set: setLoading } = useSwitch(false);

onMounted(() => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，从头开始注册");
    router.push("/reg");
  }
});

const tosForm = reactive<TosForm>({
  accept_tos: false,
  serial: localStorage.reg_serial,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleStepTos = async (values: Record<string, any>) => {
  setLoading(true);
  try {
    const res = await reg.postTosForm(values as TosForm);
    localStorage.reg_step = 1;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};
const data = [
  {
    title: "《幼态审美，从我做起》",
    link: "https://hikarifield.co.jp/purestation/",
    description: "虽然我这列车人偶的肉身不能生育",
  },
  {
    title: "《柚子厨请退群.jpg》",
    link: "https://zh.moegirl.org.cn/%E6%9F%9A%E5%AD%90%E5%8E%A8%E8%AF%B7%E9%80%80%E7%BE%A4",
    description: "笑什么笑，你也是柚子厨",
  },
];
</script>

<style scoped></style>
