<template>
    <div class="content">
        <div v-for="i in hor" :key="i" class="hor-div" >
            <div v-for="k in ver" :key='i + "" + k' @click="lottery(i,k)" class="ver-div" >
            </div>
        </div>
        <img :src="KRM" alt="">
    </div>
    
</template>

<script setup lang="ts">
const hor = ref(4)
const ver = ref(8)
import KRM from '../assets/kuruomi.png'
const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}
const lottery = (i:number,k:number) => {
    alert(`抽中了${i}行${k}列`)
}
</script>

<style scoped lang="scss">
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
@mixin cover-parent{
    width: 100%;
    // height: 100%;
}
.content{
    display: flex;
    background-color: #5760a5;
    flex-direction: column;
    width: 100vw;
    padding: 20px 150px;
    height: 100vh;
    box-sizing: border-box;
    flex-wrap: nowrap;
    // background: url('../assets/kuruomi.png') no-repeat;
    // background-position: -2% 900%;
    // background-size: contain;
}
.hor-div{
    display: flex;
    flex-basis: 200px;
    justify-content: space-between; 
    position: relative;
    z-index: 999;
    @for $i from 1 through 4{
        &:nth-child(#{$i}){
            transform: translateX(#{(1 - $i) * 10}px) translateY(#{($i - 1) * 5}px);
        }
    }
}
.ver-div{
    flex-basis: 120px;
   @include flex-center;
   
}
img{
    @include cover-parent;
    position: fixed;
    top: -852px;
    // z-index: -1;
    left: 0;
}
</style>