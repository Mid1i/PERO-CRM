<script setup lang="ts">
	import { ref, provide } from "vue";
	import type { TypePopups } from "@/types/TypePopups";
	import BaseDropdownList from "@/components/BaseDropdownList.vue";
	import UsersFiltersDate from "@/components/UsersFiltersDate.vue";
	import TheBlackout from "@/layouts/TheBlackout.vue";
	import ThePopup from "@/layouts/ThePopup.vue";
	import { 
		ACTIVITY_FILTERS, 
		COUNTRIES_FILTERS, 
		ROLES_FILTERS
	} from "@/constants";


	defineProps<{
		currentFilters: string[],
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): boolean
	}>();

	const currentPopup = ref<TypePopups>(null);


	const switchCurrentPopup = (id: TypePopups): TypePopups => currentPopup.value = currentPopup.value === id ? null : id;

	provide("currentPopup", currentPopup);
	provide("switchCurrentPopup", switchCurrentPopup);
</script>


<template>
	<TheBlackout 
		@close-popup="$emit('closePopup')"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="$emit('closePopup')"
			:is-visible="isVisible"	
			title="Фильтры по пользователям"
		>
			<main class="content">
				<BaseDropdownList
					:current-filters="currentFilters"
					:elements="COUNTRIES_FILTERS"
					title="Страна"
				/>
				<UsersFiltersDate
					:id="['dateOfBirth,from', 'dateOfBirth,to']"
					title="Дата рождения"
				/>
				<UsersFiltersDate
					:id="['dateOfRegistration,from', 'dateOfRegistration,to']"
					title="Дата регистрации"
				/>
				<BaseDropdownList
					:current-filters="currentFilters"
					:elements="ROLES_FILTERS"
					title="Роль пользователя"
				/>
				<BaseDropdownList
					:current-filters="currentFilters"
					:elements="ACTIVITY_FILTERS"
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