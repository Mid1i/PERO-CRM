<script setup lang="ts">
	import BaseDateInput from "@/components/BaseDateInput.vue"
	import type { TypeUserFilters } from "@/types/TypeUserFilters";
	import { inject } from "vue";


	defineProps<{
		id: keyof TypeUserFilters,
		title: string
	}>();

	const activePopup = inject<string | null>("activePopup");
</script>


<template>
	<section class="filter">
		<h3 class="filter__title">{{ title }}</h3>
		<div class="filter__row">
			<div class="filter__row-field">
				<span class="filter__row-text">С</span>
				<BaseDateInput
					:is-active="activePopup === `${id},from`"
					:id="id"
					step="from"
				/>
			</div>
			<div class="filter__row-field">
				<span class="filter__row-text">По</span>
				<BaseDateInput
					:is-active="activePopup === `${id},to`"
					:id="id"
					step="to"
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