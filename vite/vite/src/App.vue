<!--
 * @Date: 2024-05-23 14:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-09 15:24:29
 * @Description: 
-->
<script setup lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
// import Responsive from './components/Responsive.vue'
// import ClipPath from './components/clipPath.vue';
import AnimateSvg from './components/animateSvg.vue';
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <!-- <HelloWorld :value="1" msg="Vite + Vue" />
  <Responsive :value="value" /> -->
  <!-- <ClipPath /> -->
  <AnimateSvg />
  <button @click="value+= 1">incres</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
