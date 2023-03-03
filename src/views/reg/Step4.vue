<template>
  <section class="reg-step">
    <div class="step-title">
      <div class="step-sub-title">Step4</div>
      <div class="step-main-title">微软验证</div>
    </div>
    <transition name="status" mode="out-in">
      <div v-if="ms_status === 'unknown'">
        <a-spin></a-spin>
      </div>
      <div class="step-content" v-else-if="ms_status === 'idle'">
        <div class="step-description">
          <div>请点击启动验证流程，根据指引登录微软账号并授权</div>
          <div>认证完成后，页面状态会自动更新</div>
        </div>
        <a-spin tip="正在获取链接" :loading="isPending">
          <div class="flex flex-col gap-y-4 w-80 my-6">
            <a-button long type="primary" :href="ms_link.link_start">
              启动微软验证流程
            </a-button>
            <a-button long :href="ms_link.link_remake" target="_blank">
              清除浏览器登录信息
            </a-button>
          </div>
        </a-spin>
      </div>
      <div class="step-content" v-else-if="ms_status === 'running'">
        <div class="step-description">
          <div>验证流程运行中</div>
        </div>
        <div>
          <div class="flex items-center">
            <a-progress size="large" :percent="ms_percent" status="success" />
          </div>
          <div class="flex flex-col gap-y-2 my-2">
            <div class="text-base text-subtext dark:(text-dark-subtext)">
              <div v-for="(step, index) in current_step" :key="index">
                {{ $t(`oauth.ms.step.succeed.${index}`) }}
              </div>
            </div>
            <div
              v-if="current_step < 8"
              class="flex items-center gap-x-2 font-bold text-base text-title dark:(text-dark-title)"
            >
              <a-spin :size="24"></a-spin>
              <div>{{ $t(`oauth.ms.step.running.${current_step}`) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-content" v-else-if="ms_status === 'succeed'">
        <div class="step-description">
          <div>
            你好{{ status_res?.minecraft.minecraft_name }}，你的账号信息如下
          </div>
        </div>
        <a-form
          class="step-form"
          :model="serialForm"
          @submit-success="handleStepMs"
        >
          <div class="flex-padder"></div>
          <a-form-item field="serial" label="serial" hide-label class="hidden">
            <a-input v-model="serialForm.serial" />
          </a-form-item>
          <div class="flex gap-x-2">
            <a-button
              class="self-start"
              type="primary"
              html-type="submit"
              :disabled="ms_status !== 'succeed'"
              :loading="isLoading"
            >
              下一步
            </a-button>
            <a-button @click="handleRetry" :loading="isPending">
              重新认证
            </a-button>
          </div>
        </a-form>
      </div>
      <div class="step-content" v-else-if="ms_status === 'failed'">
        <div class="step-description">
          <div>流程发生错误</div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts" setup>
import useSwitch from "@/utils/useSwitch";
import { Message } from "@arco-design/web-vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import { MsLinkRes, MsStatusRes, SerialForm } from "@/models/reg";
import sleep from "@/utils/useSleep";

const router = useRouter();
const { val: isPending, set: setPending } = useSwitch(true);
const { val: isLoading, set: setLoading } = useSwitch(false);

const ms_link = ref<MsLinkRes>({
  link_start: "",
  link_remake: "",
});
const ms_status = ref<string>("unknown");
const current_step = ref<number>(0);

const status_res = ref<MsStatusRes>();
const ms_percent = ref<number>(0);

const serialForm = reactive<SerialForm>({
  serial: localStorage.reg_serial,
});

const updateLink = async () => {
  setPending(true);
  ms_link.value = await reg.getMsLink({ serial: localStorage.reg_serial });
  setPending(false);
};

const updateState = async () => {
  while (ms_status.value === "running" || ms_status.value === "unknown") {
    status_res.value = await reg.getMsStatus({
      serial: localStorage.reg_serial,
    });
    if (status_res.value.ms_status === "succeed") {
      current_step.value = 8;
      ms_percent.value = 1;
      await sleep(1500);
      ms_status.value = "succeed";
      break;
    }
    ms_status.value = status_res.value.ms_status;
    current_step.value = status_res.value.ms_step;
    ms_percent.value = parseFloat((current_step.value / 7).toFixed(2));
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleStepMs = async (values: Record<string, any>) => {
  setLoading(true);
  const res = await reg.postMsForm(values as SerialForm);
  localStorage.reg_step = 4;
  router.push(res.data.url);
  setLoading(false);
};

const handleRetry = () => {
  updateLink();
  ms_status.value = "idle";
  current_step.value = 0;
};

onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，需要从头开始注册");
    router.push("/reg");
  }
  updateState();
  updateLink();
});
</script>

<style>
.status-enter-active,
.status-leave-active {
  transition: opacity 0.3s;
}
.status-enter-form,
.status-leave-to {
  opacity: 0;
}
.status-enter-to,
.status-leave-from {
  opacity: 1;
}
</style>
