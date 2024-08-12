
<!--
 * @Date: 2024-06-13 14:17:39
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-14 14:40:19
 * @Description: 
-->
<template>
  <div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const { name } = useAppConfig()
  useHead({
    titleTemplate(title?: string) {
      return title ? `${title} - ${name}` : name
    }
  })
  
</script>
