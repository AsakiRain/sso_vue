<template>
  <section
    class="w-[480px] h-[px] p-12 flex bg-light dark:(bg-dark) flex-col gap-y-6"
    style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.6)"
  >
    <div class="text-2xl font-bold text-title dark:(text-dark-title)">
      正在处理你的请求
    </div>
    <div
      class="flex flex-col gap-y-2 text-subtext dark:(text-dark-subtext) font-bold"
    >
      <div>
        State: <code>{{ ms_state }}</code>
      </div>
      <div>
        Serial: <code>{{ reg_serial }}</code>
      </div>
    </div>
    <div
      class="flex gap-x-2 items-center font-bold text-title dark:(text-dark-title) text-xl"
    >
      <a-spin :size="36" v-if="isPending"></a-spin>
      <icon-check :size="36" class="text-[#00B42A]" v-else />
      <div>{{ pending_text }}</div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { Message } from "@arco-design/web-vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import sleep from "@/utils/useSleep";
import useSwitch from "@/utils/useSwitch";
import { IconCheck } from "@arco-design/web-vue/es/icon";

const router = useRouter();

const ms_state = ref<string>("");
const ms_token = ref<string>("");
const reg_serial = localStorage.reg_serial;

const { val: isPending, set: setPending } = useSwitch(true);
const pending_text = ref<string>("启动流程中");
onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，从头开始注册");
    router.push("/reg");
  }

  const params = new URLSearchParams(window.location.hash);
  ms_state.value = params.get("state") as string;
  ms_token.value = params.get("#access_token") as string;

  await reg.postMsStart({
    serial: reg_serial,
    ms_state: ms_state.value,
    ms_token: ms_token.value,
  });
  setPending(false);
  pending_text.value = "流程启动";

  await sleep(1000);
  router.push("/reg/flow/4");
});
</script>
<style lang="scss" scoped>
code {
  @apply mx-0.5 py-0.5 px-1 text-base rounded text-code bg-code dark:(text-dark-code bg-dark-code);
}
</style>
