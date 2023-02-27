<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step4</div>
      <div class="step-main-title">微软验证</div>
    </div>
    <div class="step-content">
      <div class="step-description">
        <div>一遍过，一遍过：</div>
        <a-spin tip="正在获取认证链接" :loading="msLink === null">
          <div class="flex flex-col gap-y-4 w-80 mt-8">
            <a-button
              long
              type="primary"
              :disabled="isLoading"
              :href="msLink?.link_start"
              target="_blank"
            >
              启动微软验证流程
            </a-button>
            <a-button
              long
              :disabled="isLoading"
              :href="msLink?.link_remake"
              target="_blank"
            >
              清除浏览器登录信息
            </a-button>
          </div>
        </a-spin>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { MsLinkRes } from "@/models/reg";
import useSwitch from "@/utils/useSwitch";
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";

const router = useRouter();
const { val: isLoading, set: setLoading } = useSwitch(false);
const msLink = ref<MsLinkRes>();

onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
  try {
    msLink.value = await reg.getMsLink({ serial: localStorage.reg_serial });
  } catch (err) {
    console.log(err);
  }
});
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
