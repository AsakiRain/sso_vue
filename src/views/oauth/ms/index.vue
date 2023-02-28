<template>
  <section
    class="w-[800px] h-[558px] p-12 flex bg-light dark:(bg-dark) flex-col"
    style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.6)"
  >
    <div class="text-2xl font-bold text-title dark:(text-dark-title)">
      正在处理你的请求
    </div>
    <div class="my-2 flex flex-col gap-y-1">
      <div>
        <span class="text-subtext dark:(text-dark-subtext) font-bold">
          State:
        </span>
        <code>{{ ms_state }}</code>
      </div>
      <div>
        <span class="text-subtext dark:(text-dark-subtext) font-bold">
          Serial:
        </span>
        <code>{{ reg_serial }}</code>
      </div>
    </div>
    <div class="my-2 flex gap-x-3">
      <a-progress :steps="8" :percent="percent" />
      <a-spin />
    </div>
    <div class="my-2">
      <a-button type="primary" long @click="handleLinkStart">
        点击启动流程（测试用）
      </a-button>
    </div>
    <textarea :value="queryLog"></textarea>
  </section>
</template>
<script lang="ts" setup>
import { Message } from "@arco-design/web-vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import reg from "@/api/reg";
import sleep from "@/utils/useSleep";
import { MsQueryRes } from "@/models/reg";

const router = useRouter();

const errorMsg = ref<string>("");
const errorTip = ref<string>("");
const ms_state = ref<string>("");
const ms_token = ref<string>("");
const ms_query = ref<MsQueryRes>();
const queryLog = ref<string>("");
const percent = ref<number>(0);

const reg_serial = computed<string>(() => {
  return localStorage.reg_serial;
});

onMounted(async () => {
  if (!localStorage.reg_serial) {
    Message.info("没有记录的流水号，从头开始注册");
    router.push("/reg");
  }

  const urlParams = new URLSearchParams(window.location.hash);
  console.log(urlParams.get("state"));
  console.log(urlParams.get("access_token"));
  if (!urlParams.get("state") || !urlParams.get("#access_token")) {
    errorMsg.value = "回调的参数有误，没有获取到state或token";
    errorTip.value = "请关闭页面再次认证，也可以点击登出按钮后再次尝试";
    return;
  }
  ms_state.value = urlParams.get("state") as string;
  ms_token.value = urlParams.get("#access_token") as string;
});

const handleLinkStart = async () => {
  try {
    const res = await reg.postMsStart({
      serial: reg_serial.value,
      ms_state: ms_state.value,
      ms_token: ms_token.value,
    });
    Message.success(res.message);
    doUpdateState();
    //eslint-disable-next-line
  } catch (err: any) {
    errorMsg.value = err.message;
    errorTip.value = "请关闭页面再次认证，也可以点击登出按钮后再次尝试";
  }
};

const handleUpdateState = async () => {
  try {
    ms_query.value = await reg.getMsQuery({
      serial: reg_serial.value,
    });
    queryLog.value = JSON.stringify(ms_query.value, null, 2);
    //eslint-disable-next-line
  } catch (err: any) {
    errorMsg.value = "后端不能失败！！";
  }
};

const doUpdateState = async () => {
  while (ms_query.value?.ms_end !== 1) {
    await handleUpdateState();
    await sleep(200);
    if (ms_query.value?.ms_end === 1) {
      Message.success("认证成功");
      break;
    }
  }
};

watch(
  () => ms_query.value?.ms_tip?.info,
  (newVal, oldVal) => {
    if (newVal !== oldVal && newVal) {
      Message.info(newVal as string);
    }
  }
);
</script>
<style lang="scss" scoped>
code {
  @apply mx-0.5 py-0.5 px-1 text-base rounded text-code bg-code dark:(text-dark-code bg-dark-code);
}
</style>
