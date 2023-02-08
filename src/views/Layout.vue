<template>
  <header
    class="fixed top-0 left-0 right-0 z-2 flex justify-center bg-white dark:(bg-gray-900)"
  >
    <div
      class="mx-6 h-16 flex items-center gap-x-4 text-black dark:(text-light-400)"
      :style="{ width: $route.meta.expand ? '100%' : '1200px' }"
    >
      <div class="text-xl font-bold cursor-pointer">{{ $t("site.title") }}</div>
      <div class="no-underline flex-grow flex text-base"></div>
      <div class="flex gap-x-2">
        <a-button shape="round" @click="toggleDark()">
          <template #icon>
            <icon-moon-fill v-if="isDark" />
            <icon-sun-fill v-else />
          </template>
        </a-button>
        <a-dropdown>
          <a-button shape="round">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
          <template #content>
            <a-menu>
              <a-doption>
                <span @click="changeLocale('zh-CN')">中文（简体）</span>
              </a-doption>
              <a-doption>
                <span @click="changeLocale('en-US')">English(US)</span>
              </a-doption>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="flex text-base items-center">
        <a-avatar image-url="/img/avatar/default.png"></a-avatar>
        <a-dropdown>
          <div class="px-2 rain-link rain-btn-link">
            {{ userStore.nickname }}
          </div>
          <template #content>
            <a-doption>
              <router-link to="/user/setting">个人设置</router-link>
            </a-doption>
            <a-doption>
              <router-link to="/manage/setting">系统设置</router-link>
            </a-doption>
            <a-doption>
              <span @click="handleLogout">退出登录</span>
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
  <main
    :style="{ width: $route.meta.expand ? '100%' : '1200px' }"
    class="flex mt-20 flex-grow self-center gap-x-4"
  >
    <Menu />
    <router-view></router-view>
  </main>
  <footer class="text-center text-gray-600 text-sm">AsakiRain | 2022</footer>
</template>

<script lang="ts" setup>
import {
  IconSunFill,
  IconMoonFill,
  IconLanguage,
} from "@arco-design/web-vue/es/icon";
import { onMounted } from "vue";
import useUserStore from "@/store/user";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { useDark, useToggle } from "@vueuse/core";

import Menu from "@/components/Menu.vue";
import useLocale from "@/utils/useLocale";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const userStore = useUserStore();
const router = useRouter();
const { changeLocale } = useLocale();

onMounted(async () => {
  await userStore.info();
});

const handleLogout = async () => {
  await userStore.logout();
  Message.info("已经退出登录");
  await router.push("/login");
};
</script>
<style lang="css">
.content {
  @apply flex-grow bg-white rounded-lg flex flex-col items-center;
}

.content-title {
  @apply self-stretch font-bold text-base text-center p-4 border-b
    border-b-solid border-b-gray-300;
}

@media (max-width: 1200px) {
  #header-content {
    width: 100vw;
  }

  .main {
    width: 100% !important;
  }

  .content {
    margin: 0;
    border-radius: 0;
    border-top: 1px solid var(--border-color);
  }

  #footer {
    border-top: 1px solid var(--border-color);
    background-color: var(--backgroud-color);
  }

  .content-title {
    display: none;
  }

  #route-title {
    display: inline;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }
}
</style>
