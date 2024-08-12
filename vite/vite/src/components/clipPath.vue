<template>
	<div class="main">
		<div
			v-for="(item, idx) in chartData[cur]"
			:key="idx"
			:style="{ clipPath: item.clipPath, backgroundColor: item.bgColor }"
		></div>
	</div>
    <button @click="reduce">prev</button>
    <button @click="incres">next</button>
</template>

<script setup lang="ts">
	import clipPathData from '../assets/clipPathData';
	const chartData = ref(clipPathData);
    console.log(chartData.value.length)
	const cur = ref(0);
    const incres = () => {
        if (cur.value == 19){
            cur.value = 0
        } else {
            cur.value+=1
        }
        
        
    }
    const reduce = () => {
        cur.value-=1
        if (cur.value < 0) cur.value = chartData.value.length - 1
    }
</script>

<style scoped>
	.main {
		width: 600px;
		height: 600px;
		position: relative;
	}
	.main div {
		width: 100%;
		height: 100%;
		position: absolute;
        transition: 1s;
	}
</style>
