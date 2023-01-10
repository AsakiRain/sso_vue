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
html {
  --backgroud-color: #ffffff;
  --text-color: #262626;
  --a-text-color: #458bff;
  --a-hover-color: #40a9ff;
  --hover-backgroud-color: #eeeeee;
  --border-color: #e0e0e0;
  --backgroud-image: url("/img/back-light.png");
  --footer-color: #bfbfbf;
}

html.dark {
  --backgroud-color: #141414;
  --text-color: #dcdcdc;
  --a-text-color: #3c79dc;
  --a-hover-color: #40a9ff;
  --hover-backgroud-color: #424242;
  --border-color: #404040;
  --backgroud-image: url("/img/back-dark.png");
  --footer-color: #5f5f5f;
}
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
  background-image: var(--backgroud-image);
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(6px);
  z-index: -1;
}
</style>
