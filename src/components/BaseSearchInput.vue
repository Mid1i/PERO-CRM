<script setup lang="ts">
	defineProps<{
		placeholder: string
	}>();

	const searchModel = defineModel();
</script>


<template>
	<div class="field">
		<input 
			v-model="searchModel"
			:class="['field__input', { active: searchModel }]"
			autocomplete="off"
			id="search"
			type="text"
		>
		<label class="field__label" for="search">{{ placeholder }}</label>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.field {
		position: relative;

		&__label {
			@include h3;
			color: $--text-secondary;
			font-weight: 400;

			pointer-events: none;
			padding: 2px;

			position: absolute;
			left: 15px;
			top: 50%;

			transition: all 0.1s ease-in-out;
			transform: translateY(-50%);
		}

		&__input {
			@include h3;
			background: $--background-secondary;
			border-radius: 10px;

			transition: all 0.1s ease-in-out;
			padding: 15px;
			height: 50px;
			width: 100%;

			&:focus + .field__label,
			&.active + .field__label {
				color: $--text-primary;
				font-size: 14px;
				top: 0px;
			}
		}
	}
</style>