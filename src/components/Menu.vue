<template>
  <div
    class="self-start w-50 bg-white flex flex-col rounded-lg sticky z-1 shrink-0 overflow-hidden"
  >
    <div
      class="self-stretch font-bold text-base text-center p-4 border-b border-b-solid border-b-gray-300"
    >
      菜单
    </div>
    <div class="flex flex-col items-stretch text-base">
      <router-link class="rain-link rain-block-link" to="/">{{
        $t("route.home")
      }}</router-link>
      <router-link class="rain-link rain-block-link" to="/user/info">
        {{ $t("route.user.info") }}
      </router-link>
      <router-link class="rain-link rain-block-link" to="/oauth/manage">
        {{ $t("route.oauth.manage") }}
      </router-link>
      <router-link
        class="rain-link rain-block-link border-t border-t-solid border-t-gray-300"
        to="/manage"
      >
        后台管理
      </router-link>
    </div>
  </div>
</template>
<style lang="css" scoped></style>

