<!--
 * @Date: 2024-06-17 15:07:20
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-06-20 16:55:57
 * @Description: 
-->
<template>
  <div>登录页</div>
  <!-- <div class="img">
    
    </div>
    <img src="~/assets/images/logo.png" alt=""> -->
    <div id="square"></div>
  <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
    <polyline
        class="polymorph"
      points="240 10 140 10 140 90 0 90"
      stroke="#ddd"
      fill="transparent"
      stroke-width="2"
    />
  </svg>
</template>
<script setup>
import anime from 'animejs';
definePageMeta({
  layout: false,
});
// anime({
//   targets: '.polymorph',
//   points: [
//     { value: [
//       '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369',
//       '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369']
//     },
//     { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
//     { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
//     { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
//   ],
//   easing: 'easeOutQuad',
//   duration: 2000,
//   loop: true
// });

onMounted(() => {
    anime({
        targets: '#square',
        translateX: 250,
        // left: '500px',
        backgroundColor: "#540",
        borderRadius: ['0%', '50%'],
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate',
    });
})
</script>

<style lang="scss" scoped>
.img {
  background: url('~/assets/images/logo.png') no-repeat;
  background-size: contain;
  width: 200px;
  height: 200px;
}
#square{
    width: 40px;
    height: 40px;
    position: relative;
    background-color: red;
}
</style>
