import { createI18n } from "vue-i18n";
import { zhCN } from "./zh-CN";
import { enUS } from "./en-US";

const messages = {
  "en-US": {
    ...enUS,
  },
  "zh-CN": {
    ...zhCN,
  },
};

const i18n = createI18n({
  legacy: false,
  locale: localStorage.locale || "zh-CN",
  fallbackLocale: "zh-CN",
  globalInjection: true,
  messages: messages,
});

export default i18n;
