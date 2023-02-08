import { createApp } from "vue";
import { createPinia } from "pinia";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

import App from "@/App.vue";
import router from "@/router";
import i18n from "@/locale";

import "virtual:windi.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ArcoVue);
app.use(i18n);

app.mount("#app");
// app.config.globalProperties.$message = message;
