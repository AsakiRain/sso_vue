<template>
  <div id="reg-page">
    <div class="reg-content" v-if="$router.currentRoute.value.meta.step == 0">
      <div class="wizard-wrapper">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
      <div class="reg-wizard">
        <div class="wizard-title">
          <div class="wizard-main-title">朋友船统一身份认证平台</div>
          <div class="wizard-sub-title">注册向导</div>
        </div>
        <div class="wizard-content">
          <template v-if="resume">
            <div class="wizard-text">
              <p>你已经有一个流水号了：</p>
              <p>
                <code>{{ reg_serial }}</code>
              </p>
              <p>
                这个流水号的注册进程到了第
                <code>{{ reg_step_to }}</code>
                步:
                <code>{{ findStepName(reg_step_to) }}</code>
              </p>
              <p>如果你想用现有的流水号完成注册，请点击<code>继续注册</code></p>
              <p>如果你想获取新的流水号重新注册，请点击<code>重新开始</code></p>
            </div>
            <div class="wizard-btn">
              <a-button type="primary" @click="handleResumeReg">
                继续注册
              </a-button>
              <a-popconfirm
                title="确定要重新开始注册吗？"
                ok-text="确认"
                cancel-text="取消"
                @confirm="handleRestartReg"
              >
                <a-button>重新开始</a-button>
              </a-popconfirm>
            </div>
          </template>
          <template v-else>
            <div class="wizard-text">
              <p>欢迎注册<code>朋友船统一身份认证平台</code>账号</p>
              <p>
                为了基于<code>QQ号</code>和<code>Minecraft账号</code>实现功能，需要在注册阶段就<code>完成认证</code>，因此整个注册流程会比较长
              </p>
              <p>
                注册的进度<code>保存在浏览器</code>中，所以需要在<code>同一个浏览器</code>中完成注册流程。中途清空浏览器缓存很可能需要重新开始注册
              </p>
              <p>
                网站<code>使用用户名</code>登录，因此注册用的邮箱是<code>可以重复</code>的。
              </p>
              <p>
                填写的用户名直到完成注册流程之前都<code>不会</code>被占用，所以如果你没有注册完，可以用<code>同样的</code>邮箱和账号重新开始注册
              </p>
              <p>
                点击<code>开始注册</code>，将会生成一个<code>流水号</code>，并凭流水号完成整个注册流程
              </p>
            </div>
            <div class="wizard-btn">
              <a-button type="primary" @click="handleStartReg">
                开始注册
              </a-button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="reg-content" v-else>
      <div class="step-wrapper">
        <a-steps v-model:current="current" direction="vertical">
          <a-step title="Step 1" description="用户条款" />
          <a-step title="Step 2" description="验证邮箱" />
          <a-step title="Step 3" description="创建账号" />
          <a-step title="Step 4" description="微软验证" />
          <a-step title="Step 5" description="QQ授权" />
          <a-step title="Step 6" description="基础设置" />
          <a-step title="Step 7" description="完成注册" />
        </a-steps>
      </div>
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { computed, h, ref } from "vue";
import { Empty, message, Modal } from "ant-design-vue";
import reg from "@/api/reg";
import { findStepName } from "@/utils/useRegStep";

const current = computed(() => {
  const to = router.currentRoute.value.meta.step as number;
  return to - 1;
});

const resume = computed(() => {
  return localStorage.reg_serial !== undefined;
});

const reg_serial = computed(() => {
  return localStorage.reg_serial;
});

const reg_step_to = computed(() => {
  return 1 + parseInt(localStorage.reg_step);
});

const handleStartReg = async () => {
  try {
    const res = await reg.getSerial();
    Modal.success({
      title: res.message,
      content: h("div", [
        h("p", "将使用以下流水号："),
        h("p", res.data.serial),
      ]),
      afterClose: () => {
        localStorage.reg_serial = res.data.serial;
        localStorage.reg_step = 0;
        router.push("/reg/flow/1");
      },
    });
  } catch (err: any) {
    message.error(err.message);
  }
};

const handleResumeReg = async () => {
  message.info(
    `前往第${reg_step_to.value}步：${findStepName(reg_step_to.value)}`
  );
  router.push(`/reg/flow/${reg_step_to.value}`);
};

const handleRestartReg = async () => {
  localStorage.removeItem("reg_serial");
  localStorage.removeItem("reg_step");
  location.reload();
};
</script>
<style lang="css">
code {
  margin: 0 1px;
  padding: 3px 6px;
  font-size: 15px;
  background: #f2f4f5;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
}
#reg-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reg-content {
  background-color: var(--backgroud-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  width: 800px;
  height: 558px;
  padding: 48px;
  display: flex;
}
.wizard-btn {
  display: flex;
  column-gap: 12px;
}
.step-wrapper,
.wizard-wrapper {
  width: 150px;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
}
.wizard-wrapper {
  border-left: 1px solid var(--border-color);
}
.step-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid var(--border-color);
}

.reg-step,
.reg-wizard {
  flex-grow: 1;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
}

.wizard-main-title {
  font-size: 24px;
  font-weight: bold;
}
.wizard-sub-title {
  font-size: 20px;
  line-height: 20px;
  font-style: italic;
  color: var(--sub-text-color);
}
.wizard-content {
  flex-grow: 1;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}
.wizard-text {
  flex-grow: 1;
}
.step-main-title {
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
}

.step-sub-title {
  font-size: 20px;
  line-height: 24px;
  color: var(--sub-text-color);
}
.wizard-title {
  margin-bottom: 12px;
}
.step-title {
  margin-bottom: 32px;
}
.step-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.step-description {
  font-size: 18px;
  flex-grow: 1;
}
</style>
