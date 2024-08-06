<script setup lang="ts">
	defineProps<{
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): boolean
	}>();


	const onClickBlackout = (event: MouseEvent): void => {
		const target = <HTMLElement>event.target;

		target.classList.contains("blackout") && emits("closePopup");
	}
</script>


<template>
	<div
		@click="onClickBlackout"
		:class="[
			'blackout',
			isVisible && 'active'
		]"
	>
		<slot></slot>
	</div>
</template>


<style scoped lang="scss">
	.blackout {
		background: rgb(0, 0, 0, .5);
		backdrop-filter: blur(2px);
		-webkit-backdrop-filter: blur(2px);

		pointer-events: none;
		opacity: 0;

		position: fixed;
		left: 0px;
		top: 0px;

		transition: all 0.5s ease-in-out;
		height: 100%;
		width: 100%;
		z-index: 5;

		&.active {
			pointer-events: auto;
			opacity: 1;
		}
	}
</style>