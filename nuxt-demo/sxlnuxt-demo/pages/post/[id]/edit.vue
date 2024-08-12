<!--
 * @Date: 2024-06-18 16:48:26
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-20 17:39:42
 * @Description: 
-->
<template>
    <div>
        编辑页面 {{ id }}
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth']
})
    const { 
        params: { id }
     } = useRoute();
</script>

<style lang="scss" scoped>

</style>