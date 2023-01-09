<template>
  <router-view/>
</template>
<script setup lang="ts"></script>
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
    content: '';
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
