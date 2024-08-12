<template>
	<div>
		<div id="animationContainer"></div>
		<div id="animationContainer-1" @click="animate_1"></div>
        <div></div>
	</div>
</template>

<script setup>
	import lottie from 'lottie-web';
	import jsonData from '../assets/notification.json';
	import menuData from '../assets/menu.json';
    const menu = ref(null)
    const directionMenu  = ref(-1)
	const loadAnimation = () => {
		lottie.loadAnimation({
			container: document.getElementById('animationContainer'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: jsonData,
		});
	};
    const loadAnimation_1 = () => {
		menu.value = lottie.loadAnimation({
			container: document.getElementById('animationContainer-1'),
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData: menuData,
		});
	};
    const animate_1 = () => {
        directionMenu.value = -directionMenu.value
        menu.value.setDirection(directionMenu.value)
        menu.value.play()
    }
	onMounted(() => {
		loadAnimation();
        loadAnimation_1()
	});
</script>

<style scoped></style>
