<!--
 * @Date: 2024-09-02 13:53:50
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-09-02 14:20:18
 * @Description: 
-->
<template>
    <div>111</div>
    <div class="d" v-for="idx in 10000">
        <!-- <ProgressiveImage /> -->
        <div  v-if="defer(idx)">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import ProgressiveImage from './ProgressiveImage.vue'
    const count = ref(0)
    const useDefer = (max = 10000) => {
        const fns = () => requestAnimationFrame(() => {
            count.value = count.value + 1;
            if (count.value < max) fns()
        })
        fns()
        return (counts) => {
            return count.value >= counts
        }
    }
    const defer = useDefer()
</script>

<style  scoped>
.d{
    width: 200px;
    height: 200px;
    float: left;
    border: 1px solid black;
}
.d>div {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(10, 1fr);
}
.d>div>div{
    border: 1px solid red;
}
</style>