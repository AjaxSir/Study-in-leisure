<!--
 * @Date: 2024-05-23 14:25:08
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-05-27 09:24:19
 * @Description: qu
-->
<template>
  <h1>{{ count }}</h1>
  <h1>{{ msg }}</h1>
  <div class="di" @click="getText">{{ countPlus }}</div>
  <span>value: {{ value }}</span>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    required: true,
    type: String,
  },
  value: {
    required: true,
    type: Number
  }
})

const reactiveVal = reactive({
  name: 'sxl'
})


const count = ref(234)
const getText = () => {
  count.value+=1
  const di = document.querySelector('.di') as HTMLDivElement;
  nextTick(() => {
    console.log(di?.innerHTML, count.value, 'nextTick')
  })
  console.log(di?.innerHTML, count.value)
}
const countPlus = computed({
  get: () => count.value,
  set: (val) => count.value+= val
})
watchEffect(() => {
  console.log(count.value, 'watchEffect')
})
watch([count, countPlus], ([nc,cp], [oc, op]) => {
  console.log(nc,cp, oc, op, 'watch')
})
watch(() => reactiveVal.name, (n,p) => {
  console.log(n, p, 'reactiveVal')
}, {
  deep: true,
  immediate: true
})
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
</style>
