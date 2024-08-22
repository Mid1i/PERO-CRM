<script setup lang="ts">
	import type { IFilters } from "@/interfaces/IFilters";
	import BaseDropdownList from "@/components/BaseDropdownList.vue";
	import BaseDateInput from "@/components/BaseDateInput.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { useActivePopup } from "@/composables/useActivePopup";
	import { 
		ACTIVITY_FILTERS, 
		COUNTRIES_FILTERS, 
		ROLES_FILTERS
	} from "@/constants";


	defineProps<{
		isFilterActive: (element: any, id: string) => boolean,
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void,
		(e: "updateFilters", newFilter: Partial<IFilters>): void
	}>();

	const { activePopup, updateActivePopup } = useActivePopup();

	const generateFilter = (element: any, id: string): void => {
		const actions: Record<keyof IFilters, any> = {
			dateOfRegistration: element,
			dateOfBirth: element,
			country: [element],
			isActive: element === "Активный" ? true : false,
			role: [element]
		}
		
		emits('updateFilters', { [id]: actions[id as keyof IFilters] });
	}

	const closePopup = (): void => {
		updateActivePopup(null);
		emits("closePopup");
	};
</script>


<template>
	<TheBlackout
		@close-popup="closePopup"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="closePopup"
			:is-visible="isVisible"	
			title="Фильтры по пользователям"
		>
			<main class="content">
				<BaseDropdownList
					@change-element="generateFilter"
					:is-active-element="(element: any, id: string) => isFilterActive(element, id)"
					:elements="COUNTRIES_FILTERS"
					id="country"
					title="Страна"
				/>
				<section class="content__filter">
					<h3 class="content__title">Дата рождения</h3>
					<div class="content__row">
						<div class="content__row-field">
							<span class="content__row-text">С</span>
							<BaseDateInput
								@change-date="generateFilter"
								@update-active-popup="updateActivePopup"
								:active-popup="activePopup"
								id="dateOfBirth"
								step="from"
							/>
						</div>
						<div class="content__row-field">
							<span class="content__row-text">По</span>
							<BaseDateInput
								@change-date="generateFilter"
								@update-active-popup="updateActivePopup"
								:active-popup="activePopup"
								id="dateOfBirth"
								step="to"
							/>
						</div>
					</div>
				</section>
				<section class="content__filter">
					<h3 class="content__title">Дата регистрации</h3>
					<div class="content__row">
						<div class="content__row-field">
							<span class="content__row-text">С</span>
							<BaseDateInput
								@change-date="generateFilter"
								@update-active-popup="updateActivePopup"
								:active-popup="activePopup"
								id="dateOfRegistration"
								step="from"
							/>
						</div>
						<div class="content__row-field">
							<span class="content__row-text">По</span>
							<BaseDateInput
								@change-date="generateFilter"
								@update-active-popup="updateActivePopup"
								:active-popup="activePopup"
								id="dateOfRegistration"
								step="to"
							/>
						</div>
					</div>
				</section>
				<BaseDropdownList
					@change-element="generateFilter"
					:is-active-element="(element: any, id: string) => isFilterActive(element, id)"
					:elements="ROLES_FILTERS"
					id="role"
					title="Роль пользователя"
				/>
				<BaseDropdownList
					@change-element="generateFilter"
					:is-active-element="(element: any, id: string) => isFilterActive(element, id)"
					:elements="ACTIVITY_FILTERS"
					id="isActive"
					title="Активность пользователя"
				/>
			</main>
		</ThePopup>
	</TheBlackout>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.content {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		gap: 40px;

		&__filter {
			display: flex;
			flex-direction: column;
			gap: 15px;
		}

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