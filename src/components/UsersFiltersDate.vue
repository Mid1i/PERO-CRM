<script setup lang="ts">
	import { Ref, inject } from "vue";
	import type { TypePopups } from "@/types/TypePopups";
	import BaseDateInput from "@/components/BaseDateInput.vue";


	defineProps<{
		id: TypePopups[],
		title: string
	}>();


	const currentPopup = <Ref<TypePopups>>inject("currentPopup");
</script>


<template>
	<section class="filter">
		<h3 class="filter__title">{{ title }}</h3>
		<div class="filter__row">
			<div class="filter__row-field">
				<span class="filter__row-text">С</span>
				<BaseDateInput
					:is-active="currentPopup === id[0]"
					:id="id[0]"
				/>
			</div>
			<div class="filter__row-field">
				<span class="filter__row-text">По</span>
				<BaseDateInput
					:is-active="currentPopup === id[1]"
					:id="id[1]"
				/>
			</div>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.filter {
		display: flex;
		flex-direction: column;
		gap: 15px;

		&__title {
			@include h3;
		}

		&__row {
			align-items: center;
			display: flex;
			gap: 50px;

			&-field {
				align-items: center;
				display: flex;
				gap: 20px;
			}

			&-text {
				@include text;
			}
		}
	}
</style>