<template>
  <div id="reg-page">
    <div id="reg-content" v-if="">
      <div id="step-wrapper">
        <a-steps v-model:current="current" direction="vertical">
          <a-step title="Step 1" description="用户条款" />
          <a-step title="Step 2" description="邮箱验证" />
          <a-step title="Step 3" description="账号创建" />
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
import { computed, ref } from "vue";

const current = ref<number>(0);
</script>
<style lang="css">
#reg-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#reg-content {
  background-color: var(--backgroud-color);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  width: 800px;
  padding: 48px;
  display: flex;
}
#step-wrapper {
  width: 150px;
  border-right: 1px solid var(--border-color);
}

.reg-step {
  flex-grow: 1;
  padding: 0 48px;
  display: flex;
  flex-direction: column;
}
.step-main-title {
  font-size: 24px;
  line-height: 24px;
}
.step-sub-title {
  font-size: 20px;
  line-height: 24px;
  color: var(--sub-text-color);
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
