<script setup lang="ts">
	import { ref, inject } from "vue";
	import type { TypeUserFilters, TypeUserFiltersValues } from "@/types/TypeUserFilters";
	import type { TypeUserCountries } from "@/types/TypeUserCountries";
	import type { TypeUserRoles } from "@/types/TypeUserRoles";
	import type { TypeActivity } from "@/types/TypeActivity";
	import BaseCheckbox from "@/components/BaseCheckbox.vue";


	type TypeElement = TypeUserCountries | TypeUserRoles | TypeActivity;


	defineProps<{
		id: TypeUserFilters,
		title: string,
		elements: TypeElement[]
	}>();


	const isActiveList = ref<boolean>(false);

	const updateFilters = inject<(el: TypeUserFiltersValues, id: TypeUserFilters) => void>("updateFilters");
	const isInFilters = inject<(el: TypeUserFiltersValues, id: TypeUserFilters) => boolean>("isInFilters");


	const onToggleList = (): boolean => isActiveList.value = !isActiveList.value;
</script>


<template>
	<section class="dropdown">
		<header
			@click="onToggleList" 
			class="dropdown__header"
		>
			{{ title }}
			<button :class="['dropdown__header-button', isActiveList && 'active']"></button>
		</header>
		<ul :class="['dropdown__list', isActiveList && 'active']">
			<li
				v-for="element in elements"
				:key="element"
				class="dropdown__list-el"
			>
				<BaseCheckbox 
					:is-active="isInFilters && isInFilters(element, id)"
					@click="() => updateFilters && updateFilters(element, id)" 
					:id="element"
				/>
				<label 
					:for="element"
					class="dropdown__list-label"
				>
					{{ element }}
				</label>
			</li>
		</ul>	
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.dropdown {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 280px;

		&__header {
			align-items: center;
			display: flex;
			justify-content: space-between;
			
			@include h3;
			cursor: pointer;

			&-button {
				position: relative;

				height: 10px;
				width: 10px;

				&::before,
				&::after {
					background: $--text-primary;
					content: "";

					position: absolute;
					top: 15%;
					
					transition: all 0.3s ease-in-out;
					height: 2px;
					width: 100%;
				}

				&::before {
					left: -1px;
					transform: translateY(-50%) rotate(45deg);
					transform-origin: left top;
				}

				&::after {
					right: -1px;	
					transform: translateY(-50%) rotate(-45deg);
					transform-origin: right top;
				}

				&.active::before,
				&.active::after {
					top: 0px;
					width: 19px;
				}
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 15px;

			transition: all 0.2s ease-in-out;
			overflow: hidden;
			max-height: 0px;
			opacity: 0;

			&.active {
				opacity: 1;
				max-height: 200px;
			}

			&-el {
				align-items: center;
				display: flex;
				gap: 10px;
			}

			&-label {
				@include text;
				cursor: pointer;
			}
		}
	}


	@media(hover: hover) {
		.dropdown__list-el:hover .checkbox {
			border-color: $--text-primary;
		}

		.dropdown__list-el:hover .dropdown__list-label {
			color: $--text-primary;
		}
	}
</style>