<script setup lang="ts">
	import { ISorting } from "@/interfaces/ISorting";
	import BaseCheckbox from "@/components/BaseCheckbox.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { SORTING_ITEMS } from "@/constants";


	defineProps<{
		sorting: ISorting | null,
		isVisible: boolean
	}>();

	defineEmits<{
		(e: "closePopup"): void,
		(e: "setSorting", value: ISorting): void
	}>();
</script>


<template>
	<TheBlackout 
		@close-popup="$emit('closePopup')"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="$emit('closePopup')"
			:is-visible="isVisible"	
			title="Сортировать пользователей"
		>
			<main class="content">
				<ul class="content__list">
					<li
						v-for="({ icon, title, value }) in SORTING_ITEMS" 
						:key="value.field + value.order"
						class="content__list-el"
					>
						<BaseCheckbox
							@click="$emit('setSorting', value)"
							:isActive="value === sorting"
							:id="value.field + value.order"
						/>
						<label :for="value.field + value.order" class="content__list-label">
							<div class="content__list-icon" v-html="icon"></div>
							{{ title }}
						</label>
					</li>
				</ul>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.content {
		flex: 1 0 auto;

		&__list {
			display: flex;
			flex-direction: column;
			gap: 20px;

			&-el {
				align-items: center;
				display: flex;
				gap: 20px;
			}

			&-icon:deep(path) {
				fill: $--text-primary;
			}

			&-label {
				align-items: center;
				display: flex;
				gap: 15px;

				@include h3;
				cursor: pointer;
			}
		}
	}


	@media(hover: hover) {
		.content__list-el:hover .checkbox {
			border-color: $--text-secondary;
		}
	}
</style>