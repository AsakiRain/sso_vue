<template>
  <header id="header">
    <div id="header-content" :style="{width: $route.meta.expand ? '100%' : '1200px'}">
      <div id="main-title">Friendship CAS</div>
      <div id="nav-bar">
        <router-link v-for="item in routeLinks" :key="item.title" :to="item.path" class="nav-link btn-link">
          {{ item.title }}
        </router-link>
      </div>
      <div id="tool-bar">
        <a-button shape="circle" size="middle">D</a-button>
      </div>
      <div id="user-bar">
        <a-avatar size="large" src="/img/avatar/default.png">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <div id="bar-username" class="nav-link btn-link">{{ userStore.nickname }}</div>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <router-link to="/user/setting">个人设置</router-link>
              </a-menu-item>
              <a-menu-item key="1">
                <router-link to="/manage/setting">系统设置</router-link>
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item key="3">
                <span @click="handleLogout">退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
  <router-view></router-view>
  <footer id="footer">
    AsakiRain | 2022
  </footer>
</template>

<script lang="ts" setup>
  import { UserOutlined } from '@ant-design/icons-vue';
  import { onMounted, reactive } from 'vue';
  import useUserStore from '@/store/user';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  import type { RouteLink } from '@/models';

  const userStore = useUserStore();
  const router = useRouter();

  onMounted(async () => {
  });

  const handleLogout = async () => {
    await userStore.logout();
    message.info('已经退出登录');
    await router.push('/login');
  };
  const routeLinks = reactive<RouteLink[]>([
    {
      title: '主页',
      path: '/'
    },
    {
      title: '个人信息',
      path: '/'
    },
    {
      title: '授权管理',
      path: '/'
    }
  ]);
</script>

<style lang="css">
  #header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
  }

  #header-content {
    margin: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
  }

  #main-title {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  #nav-bar {
    text-decoration: none;
    flex-grow: 1;
    display: flex;
    font-size: 16px;
    margin: 0 16px 0 16px;
  }

  .nav-link {
    padding: 0 16px;
    text-decoration: none;
    color: #1F1F1F;
    transition: 0.28s background-color cubic-bezier(.4, 0, .2, 1);
  }

  .btn-link {
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
  }

  .nav-link:hover {
    background-color: #EEEEEE;
  }

  #tool-bar {
    margin: 0 16px 0 16px;
  }

  #user-bar {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  #footer {
    text-align: center;
    height: 16px;
    line-height: 1;
  }

  #bar-username {
    padding: 0 8px;
    cursor: pointer;
  }

  .main {
    flex-grow: 1;
    align-self: center;
    display: flex;
    margin-top: 64px;
  }

  .side-bar {
    align-self: start;
    width: 200px;
    margin: 16px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    position: sticky;
    top: 80px;
    z-index: 1;
    flex-shrink: 0;
  }

  .side-title {
    align-self: stretch;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding: 16px;
    border-bottom: 1px solid #E0E0E0;
  }

  .content {
    flex-grow: 1;
    background-color: #FFFFFF;
    margin: 16px 16px 16px 0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content-title {
    align-self: stretch;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    padding: 16px;
    border-bottom: 1px solid #E0E0E0;
  }

</style>
