<script setup lang="ts">
	import TheSidebar from "./TheSidebar.vue";
	// import TheHeader from "@/layouts/TheHeader.vue";
</script>


<template>
	<div class="container">
		<TheSidebar/>
		<main class="container__content">
			<!-- <TheHeader/> -->
			<slot></slot>
		</main>
	</div>
</template>


<style scoped lang="scss">
	.container {
		display: flex;
		gap: 40px;

		padding: 20px 40px 40px;

		height: 100%;
		width: 100%;

		&__content {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
		}
	}
</style>