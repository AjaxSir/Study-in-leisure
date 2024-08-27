<!--
 * @Date: 2024-08-27 10:40:13
 * @LastEditors: xiaolong.su@bst.ai
 * @LastEditTime: 2024-08-27 10:52:47
 * @Description: 
-->
<template>
	<div>
		<img
			class="img progress"
			src="https://picsum.photos/200/300/?blur"
			alt=""
		/>
		<img
			@load="handleLoaded"
			class="img original"
			src="https://picsum.photos/800/1200"
			alt=""
		/>
	</div>
</template>

<script setup>
	const handleLoaded = (e) => {
		console.log(e.target, 'eee');
        // setTimeout(() => {
            e.target.parentElement.classList.add('loaded')
        // }, 1000);
	};
</script>

<style scoped>
	div {
		position: relative;
		width: 400px;
		height: 600px;
	}
	.img {
		width: inherit;
		height: inherit;
		position: absolute;
		left: 0px;
		top: 0px;
	}
	.progress {
		filter: blur(5);
		opacity: 1;
	}
	.original {
		opacity: 0;
		filter: blur(0);
	}
    .loaded .progress{
        opacity: 0;
    }
    .loaded .original{
        opacity: 1;
		filter: blur(0);
    }
</style>
