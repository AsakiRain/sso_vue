<template>
  <section
    class="w-[800px] h-[558px] p-12 flex bg-light dark:(bg-dark) flex-col gap-y-2"
    style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.6)"
  >
    <div class="text-2xl font-bold text-title dark:(text-dark-title)">
      正在处理你的请求
      <a-button type="primary" @click="handleLinkStart"> 测试 </a-button>
    </div>
    <div
      class="flex flex-col gap-y-1 text-subtext dark:(text-dark-subtext) font-bold"
    >
      <div>
        State:<code>{{ ms_state }}</code>
      </div>
      <div>
        Serial: <code>{{ reg_serial }}</code>
      </div>
    </div>
    <div class="flex gap-x-3 items-center my-2">
      <a-progress
        size="large"
        :percent="percent"
        :status="ms_status === 'failed' ? 'danger' : 'success'"
      />
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
    <div v-if="ms_status === 'failed'"></div>
  </section>
</template>
<script lang="ts" setup>
import { Message } from "@arco-design/web-vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import sleep from "@/utils/useSleep";

const router = useRouter();

const ms_state = ref<string>("");
const ms_token = ref<string>("");

const current_step = ref<number>(0);
const ms_status = ref<string>("running");

const percent = computed<number>(() => {
  if (ms_status.value === "succeed") return 1;
  return parseFloat((current_step.value / 7).toFixed(2));
});

const reg_serial = computed<string>(() => {
  return localStorage.reg_serial;
});

onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，从头开始注册");
    router.push("/reg");
  }
});

const handleLinkStart = async () => {
  // 0. parse url params
  const params = new URLSearchParams(window.location.hash);
  ms_state.value = params.get("state") as string;
  ms_token.value = params.get("#access_token") as string;

  // 1. post and start flow
  const res = await reg.postMsStart({
    serial: reg_serial.value,
    ms_state: ms_state.value,
    ms_token: ms_token.value,
  });
  Message.success(res.message);
  current_step.value = 1;

  // 2 - 7. update flow status
  while (ms_status.value === "running") {
    const data = await reg.getMsQuery({
      serial: reg_serial.value,
    });
    current_step.value = data.ms_step;
    ms_status.value = data.ms_status;
    await sleep(250);
  }
  if (ms_status.value === "failed") {
    Message.error("认证失败");
  }
  Message.success("认证成功");
  current_step.value = 8;
};
</script>
<style lang="scss" scoped>
code {
  @apply mx-0.5 py-0.5 px-1 text-base rounded text-code bg-code dark:(text-dark-code bg-dark-code);
}
</style>
