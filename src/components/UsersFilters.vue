<script setup lang="ts">
	import { ref, provide } from "vue";
	import type { IFilters } from "@/interfaces/IFilters";
	import BaseDropdownList from "@/components/BaseDropdownList.vue";
	import BaseDateFilters from "@/components/BaseDateFilters.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { 
		ACTIVITY_FILTERS, 
		COUNTRIES_FILTERS, 
		ROLES_FILTERS
	} from "@/constants";


	defineProps<{
		isFilterActive: (element: any, id: keyof IFilters) => boolean,
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): void,
		(e: "updateFilters", newFilter: Partial<IFilters>): void
	}>();

	const activeCalendarPopup = ref<string | null>(null);

	const generateFilter = (element: any, id: keyof IFilters): void => {
		const actions: Record<keyof IFilters, any> = {
			dateOfRegistration: element,
			dateOfBirth: element,
			country: [element],
			isActive: element === "Активный" ? true : false,
			role: [element]
		}
		
		emits('updateFilters', { [id]: actions[id] });
	}

	const updateActiveCalendarPopup = (id: string | null): void => {
		activeCalendarPopup.value = activeCalendarPopup.value === id ? null : id;
	}

	const closePopup = (): void => {
		updateActiveCalendarPopup(null);
		emits("closePopup");
	};

	provide("activePopup", activeCalendarPopup);
	provide("updateActivePopup", updateActiveCalendarPopup);
	provide("generateFilter", generateFilter);
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
					:is-active-element="(element: any, id: keyof IFilters) => isFilterActive(element, id)"
					:elements="COUNTRIES_FILTERS"
					id="country"
					title="Страна"
				/>
				<BaseDateFilters
					id="dateOfBirth"
					title="Дата рождения"
				/>
				<BaseDateFilters
					id="dateOfRegistration"
					title="Дата регистрации"
				/>
				<BaseDropdownList
					:is-active-element="(element: any, id: keyof IFilters) => isFilterActive(element, id)"
					:elements="ROLES_FILTERS"
					id="role"
					title="Роль пользователя"
				/>
				<BaseDropdownList
					:is-active-element="(element: any, id: keyof IFilters) => isFilterActive(element, id)"
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
	}
</style>