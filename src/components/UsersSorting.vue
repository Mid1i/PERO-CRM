<script setup lang="ts">
	import type { TypeSorting } from "@/types/TypeSorting";
	import BaseCheckbox from "@/components/BaseCheckbox.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { SORTING_ITEMS } from "@/constants";


	defineProps<{
		currentSorting: TypeSorting | null,
		isVisible: boolean
	}>();

	defineEmits<{
		(e: "closePopup"): void,
		(e: "switchSorting", value: TypeSorting): void
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
						:key="value"
						class="content__list-el"
					>
						<BaseCheckbox
							@click="$emit('switchSorting', value)"
							:isActive="value === currentSorting"
							:id="value"
						/>
						<label :for="value" class="content__list-label">
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