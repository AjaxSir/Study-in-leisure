<!--
 * @Date: 2024-12-11 17:35:10
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-12-16 10:52:11
 * @Description: 
-->
<template>
  <el-switch
    v-model="multiple"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    :active-value="true"
    :inactive-value="false"
  />
  <input type="file" :multiple="multiple" @change="change" />
  <el-button @click="submit">上传</el-button>
  <img v-show="preview" :src="preview" alt="" />
  <el-button @click="downloadImage">down</el-button>
  <a href="/v1/upload/export?url=1733968755335-.png">download</a>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
const multiple = ref(true);
const fileList = ref<File | File[]>();
const preview = ref("");

const change = (event: Event) => {
  // handle file upload logic here
  console.log(event, "uploadFile");
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    console.log(event, "uploadFile");
    if (multiple.value) {
      fileList.value = Array.from(target.files);
    } else {
      fileList.value = target.files[0]; // 获取第一个文件
    }
  }
};

const submit = () => {
  const formData = new FormData();
  console.log(fileList.value, "fileList.value[0]");
  if (!fileList.value) {
    console.error("请选择上传图片");
    return;
  }
  if (multiple.value) {
    if (Array.isArray(fileList.value)) {
      fileList.value.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      console.error("fileList.value 应该是数组类型");
    }
  } else {
    if (fileList.value instanceof File) {
      formData.append("file", fileList.value);
    } else {
      console.error("fileList.value 应该是 File 类型");
    }
  }
  axios
    .post(`/v1/upload/album${multiple.value ? 's' : ''}`, formData)
    .then((res) => {
      console.log(res.data);
      preview.value = `/images/${res.data.data.url}`;
    })
    .catch((err) => {
      console.error(err);
    });
};
const downloadImage = () => {
  fetch("/v1/upload/stream?url=1733968918203-.png")
    .then((res) => res.arrayBuffer())
    .then((res) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([res]));
      a.download = "image.zip";
      a.click();
      URL.revokeObjectURL(a.href);
      document.removeChild(a);
    });
};
</script>

<style scoped></style>
