<script setup lang="ts">
	defineProps<{
		label: string,
		readonly: boolean,
		type: "text" | "tel" | "email" | "num"
	}>();

	const inputModel = defineModel();
</script>


<template>
	<div class="field">
		<input
			v-model="inputModel"
			:class="['field__input', { active: inputModel }]"
			:readonly="readonly"
			:type="type"
			:id="label"
			autocomplete="off"
		>
		<label class="field__label" :for="label">{{ label }}</label>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.field {
		position: relative;
		width: 100%;

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

			text-overflow: ellipsis;

			transition: all 0.1s ease-in-out;
			padding: 15px;
			height: 40px;
			width: 100%;

			&:focus + .field__label,
			&.active + .field__label {
				color: $--text-primary;
				font-size: 14px;
				top: 0px;
			}

			&:read-only {
				background: transparent;
				pointer-events: none;

				& + .field__label {
					color: $--text-secondary;
					font-size: 12px;
					left: 12px;
				}
			}
		}
	}
</style>