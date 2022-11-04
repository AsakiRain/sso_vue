<template>
  <div class="container">
    <Breadcrumb :items="['menu.user', 'menu.user.info']" />
    <div class="content">
      <a-descriptions
        :data="data"
        size="large"
        :title="t('user.info.title')"
        bordered
        :column="1"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';
  import { useI18n } from 'vue-i18n';
  import { DescData } from '@arco-design/web-vue';

  const { t } = useI18n();
  const userStore = useUserStore();
  const userInfo = userStore;
  const data = [
    {
      label: () => t('user.info.uid'),
      value: userInfo.uid,
    },
    {
      label: () => t('user.info.username'),
      value: userInfo.username,
    },
    {
      label: () => t('user.info.nickname'),
      value: userInfo.nickname,
    },
    {
      label: () => t('user.info.email'),
      value: userInfo.email,
    },
    {
      label: () => t('user.info.phone'),
      value: userInfo.phone,
    },
    {
      label: () => t('user.info.avatar'),
      value: userInfo.avatar,
    },
    {
      label: () => t('user.info.role'),
      value: userInfo.role,
    },
    {
      label: () => t('user.info.created_at'),
      value: userInfo.created_at,
    },
    {
      label: () => t('user.info.updated_at'),
      value: userInfo.updated_at,
    },
    {
      label: () => t('user.info.deleted_at'),
      value: userInfo.deleted_at,
    },
  ] as DescData[];
</script>

<script lang="ts">
  export default {
    name: 'Info',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  .content {
    display: flex;
    margin-top: 12px;

    &-left {
      flex: 1;
      margin-right: 16px;
      overflow: hidden;
      // background-color: var(--color-bg-2);

      :deep(.arco-tabs-nav-tab) {
        margin-left: 16px;
      }
    }

    &-right {
      width: 332px;
    }

    .tab-pane-wrapper {
      padding: 0 16px 16px 16px;
    }
  }
</style>

<style lang="less" scoped>
  .mobile {
    .content {
      display: block;

      &-left {
        margin-right: 0;
        margin-bottom: 16px;
      }

      &-right {
        width: 100%;
      }
    }
  }
</style>
