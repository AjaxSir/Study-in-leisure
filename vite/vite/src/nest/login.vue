<!--
 * @Date: 2024-12-11 13:42:53
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-11 14:06:11
 * @Description: 
-->
<template>
  <el-form label-width="auto" :model="formLabelAlign" style="max-width: 600px">
    <el-form-item label="账号" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.pwd" />
    </el-form-item>
    <el-form-item label="验证码" :label-position="itemLabelPosition">
      <el-input v-model="formLabelAlign.code" />
      <img :src="imgUrl" @click="resetImage" alt="">
    </el-form-item>
  </el-form>
  <el-button @click="submit">提交</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormItemProps } from "element-plus";
const imgUrl = ref('/v1/user/code')
const resetImage = () => {
    imgUrl.value = `/v1/user/code?t=${new Date().getTime()}`;  // 重置验证码图片
}
const itemLabelPosition = ref<FormItemProps["labelPosition"]>("left");
const formLabelAlign = reactive({
  name: "",
  pwd: "",
  code: "",
});
const submit = () => {
    fetch('/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formLabelAlign)
    }).then(res => res.json()).then((res) => {
        console.log(res)
    })
}
</script>
