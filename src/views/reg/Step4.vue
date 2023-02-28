<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step4</div>
      <div class="step-main-title">微软验证</div>
    </div>
    <div class="step-content">
      <div class="step-description">
        <div>请点击启动验证流程，根据指引登录微软账号并授权</div>
        <div>认证完成后，回到这里点击更新认证状态</div>
      </div>
      <a-form
        class="flex-grow"
        id="tos-form"
        :model="serialForm"
        @submit-success="handleStepMs"
      >
        <a-spin tip="正在获取链接" :loading="isPending">
          <div class="flex flex-col gap-y-4 w-80 mt-8">
            <a-button long type="primary" @click="() => handleGoOAuth(true)">
              启动微软验证流程
            </a-button>
            <a-button long type="primary" @click="handleCheckState">
              检查认证状态
            </a-button>
            <a-button long @click="() => handleGoOAuth(false)">
              清除浏览器登录信息
            </a-button>
          </div>
        </a-spin>
        <div class="flex-padder"></div>

        <a-form-item field="serial" label="serial" hide-label class="hidden">
          <a-input v-model="serialForm.serial" />
        </a-form-item>
        <a-button
          class="self-start"
          type="primary"
          html-type="submit"
          :disabled="isFinished"
          :loading="isLoading"
        >
          下一步
        </a-button>
      </a-form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import useSwitch from "@/utils/useSwitch";
import { Message } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import { SerialForm } from "@/models/reg";

const router = useRouter();
const { val: isPending, set: setPending } = useSwitch(false);
const { val: isLoading, set: setLoading } = useSwitch(false);
const { val: isFinished, set: setFinished } = useSwitch(false);

const serialForm = reactive<SerialForm>({
  serial: localStorage.reg_serial,
});

onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
});

const handleGoOAuth = async (start: boolean) => {
  try {
    setPending(true);
    const msLink = await reg.getMsLink({ serial: localStorage.reg_serial });
    if (start) {
      window.open(msLink.link_start, "_blank");
    } else {
      window.open(msLink.link_remake, "_blank");
    }
  } catch (err) {
    console.log(err);
  } finally {
    setPending(false);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleStepMs = async (values: Record<string, any>) => {
  setLoading(true);
  try {
    const res = await reg.postMsForm(values as SerialForm);
    localStorage.reg_step = 4;
    router.push(res.data.url);
    // eslint-disable-next-line
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
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
