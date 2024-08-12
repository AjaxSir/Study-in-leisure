<!--
 * @Date: 2024-06-14 14:36:43
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-20 17:32:47
 * @Description: 
-->
<template>
  <div class="name">
    <header>
      <nav>
        <div>
          <NuxtLink to="/"> 🌳首页 </NuxtLink>
        </div>
      </nav>
      <nav>
        <div>
          <NuxtLink to="/about"> 关于 </NuxtLink>
        </div>
      </nav>
      <nav>
        <div>
          <NuxtLink to="/post"> 内容 </NuxtLink>
        </div>
      </nav>
    </header>
    <el-button type="primary" @click="router.push('/post/1/edit')"
      >关于我们 -></el-button
    >
    <el-button type="primary" @click="navigateTo({
        path: '/login',
        query: {
            id: 1
        }
    })"
      >回到登录 -></el-button
    >
    <div class="g-svg">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <polyline points="240 10 140 10 140 90 0 90" stroke="#ddd" fill="transparent" stroke-width="2" />
            <polyline class="g-dashed-line" points="240 10 140 10 140 90 0 90" fill="transparent" stroke-width="2" />
        </svg>
    </div>
    <div class="tx"></div>

    <slot></slot>
  </div>
</template>

<script setup>
const name = ref(1);

const router = useRouter();
</script>

<style lang="scss">
@import '~/assets/styles/default.scss';
.router-link-active {
  font-weight: bold;
  color: black;
}
header {
  display: flex;
  nav {
    margin-left: 20px;
  }
  a {
    color: gray;
    text-decoration: none;
  }
}
.g-svg {
    width: 240px;
    height: 100px;

    .g-dashed-line {
        stroke: #fc0;
        stroke-dasharray: 20, 320;
        stroke-dashoffset: 0;
        animation: move 4s infinite linear;
        filter: drop-shadow(0 0 5px #ff3d00);
    }
}

@keyframes move {
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: -320;
    }
}
.tx {
    position: relative;
    width: 100px;
    height: 100px;
    overflow: hidden;
    &::after {
        content: '';
        position: absolute;
        left: -50%;
        top: -50%;
        width: 200%;
        height: 200%;
        // background: conic-gradient(#399953, #399953 25%, #fbb300 25%, #fbb300 50%, #d53e33 50%, #d53e33 75%, #377af5 75%, #377af5);
        background: conic-gradient(#399953, #399953 25%, transparent 25%, transparent);
        animation: ro 2s infinite linear;
    }
    &::before{
        content: '';
        position: absolute;
        left: 2%;
        top: 2%;
        width: 96%;
        height: 96%;
        z-index: 99;
        background-color: white;
    }
}

@keyframes ro {
    100% {
        transform: rotate(1turn);
    }
}
</style>
