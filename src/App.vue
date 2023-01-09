<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { computed } from "vue";
import useLocale from "@/utils/useLocale";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enUS from "ant-design-vue/es/locale/en_US";

const { currentLocale } = useLocale();

const locale = computed(() => {
  switch (currentLocale.value) {
    case "zh-CN":
      return zhCN;
    case "en-US":
      return enUS;
    default:
      return zhCN;
  }
});
</script>
<style>
* {
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

body {
  height: 100vh;
}

#app {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 100vh;
}

#app::before {
  content: "";
  position: fixed;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background-image: url("/img/back-dark.png");
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(6px);
  z-index: -1;
}
</style>
