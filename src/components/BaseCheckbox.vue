<script setup lang="ts">
	defineProps<{
		isActive: boolean
		id: string
	}>();
</script>


<template>
	<input 
		:checked="isActive"
		:id="id"
		class="checkbox"
		type="checkbox"
	>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.checkbox {
		appearance: none;
		cursor: pointer;

		background: $--background-secondary;
		box-shadow: 0px 32px 48px 0px $--box-shadow;
		border: 1px solid transparent;
		border-radius: 5px;

		position: relative;
		height: 20px;
		width: 20px;

		&:checked::before {
			content: "✔";

			position: absolute;
			left: 50%;
			top: 50%;

			transform: translate(-50%, -55%);
		}
	}
</style>