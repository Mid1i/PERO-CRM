<script setup lang="ts">
	import type { TypeSorting } from "@/types/TypeSorting";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { SORTING_ITEMS } from "@/constants";


	defineProps<{
		currentSorting: TypeSorting | null,
		isVisible: boolean
	}>();

	defineEmits<{
		(e: "closePopup"): boolean,
		(e: "switchSorting", value: TypeSorting): TypeSorting
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
						<input 
							@click="$emit('switchSorting', value)"
							:checked="value === currentSorting"
							:id="value"
							class="content__list-input"
							type="checkbox"
						>
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

			&-input {
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
		.content__list-el:hover .content__list-input {
			border-color: $--text-secondary;
		}
	}
</style>