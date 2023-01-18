<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step1</div>
      <div class="step-main-title">用户条款</div>
    </div>
    <div class="step-content">
      <div class="step-description">请阅读并同意以下的用户条款：</div>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.link" target="_blank">{{ item.title }}</a>
              </template>
              <template #avatar>
                <FileTextOutlined />
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <div class="flex-padder"></div>
      <a-form
        class="step-form"
        id="tos-form"
        :model="tosForm"
        @finish="handleStepTos"
      >
        <a-form-item
          name="accept_tos"
          :rules="[
            {
              required: true,
              message: '请阅读并同意以上条款',
            },
          ]"
        >
          <a-checkbox v-model:checked="tosForm.accept_tos">
            我已阅读并同意以上条款
          </a-checkbox>
        </a-form-item>
        <a-form-item hidden name="serial">
          <a-input v-model:value="tosForm.serial" />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="!tosForm.accept_tos"
            :loading="isLoading"
          >
            下一步
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { TosForm } from "@/models/reg";
import useToggle from "@/utils/useToggle";
import { FileTextOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
const router = useRouter();
const { val: isLoading, set: setLoading } = useToggle(false);

onMounted(() => {
  if (!localStorage.reg_serial) {
    message.info("没有记录的流水号，从头开始注册");
    router.push("/reg");
  }
});

const tosForm = reactive<TosForm>({
  accept_tos: false,
  serial: localStorage.reg_serial,
});

const handleStepTos = async (tosForm: TosForm) => {
  setLoading(true);
  console.log(tosForm);
  try {
    const res = await reg.postTosForm(tosForm);
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

<style scoped>
#tos-form {
  flex-grow: 0;
}
</style>
