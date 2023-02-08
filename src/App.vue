<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup lang="ts">
import { computed } from "vue";
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn";
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import { ArcoLang } from "@arco-design/web-vue/es/locale/interface";

import useLocale from "@/utils/useLocale";
const { currentLocale } = useLocale();

const locales: Record<string, ArcoLang> = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

const locale = computed(() => {
  return locales[currentLocale.value] || zhCN;
});
</script>
<style lang="css">
* {
  @apply box-border font-sans;
}
body {
  @apply h-screen m-0;
}

#app {
  @apply flex flex-col min-h-screen;
}

#app::before {
  @apply content-DEFAULT fixed -inset-2.5 blur-6 -z-1;
  background-image: url("/img/back-light.png");
  @apply bg-cover bg-no-repeat;
}

html.dark #app::before {
  background-image: url("/img/back-dark.png");
}
</style>
