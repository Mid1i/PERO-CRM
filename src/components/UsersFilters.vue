<script setup lang="ts">
	import { ref, provide } from "vue";
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
		isVisible: boolean
	}>();

	const emits = defineEmits<{
		(e: "closePopup"): boolean
	}>();


	const currentPopup = ref<string | null>(null);


	const switchCurrentPopup = (id: string | null): string | null => currentPopup.value = currentPopup.value === id ? null : id;

	const onClosePopup = () => {
		switchCurrentPopup(null);
		emits("closePopup");
	};

	provide("currentPopup", currentPopup);
	provide("switchCurrentPopup", switchCurrentPopup);
</script>


<template>
	<TheBlackout
		@close-popup="onClosePopup"
		:is-visible="isVisible"
	>
		<ThePopup
			@close-popup="onClosePopup"
			:is-visible="isVisible"	
			title="Фильтры по пользователям"
		>
			<main class="content">
				<BaseDropdownList
					:elements="COUNTRIES_FILTERS"
					id="countries"
					title="Страна"
				/>
				<UsersFiltersDate
					id="dateOfBirth"
					title="Дата рождения"
				/>
				<UsersFiltersDate
					id="dateOfRegistration"
					title="Дата регистрации"
				/>
				<BaseDropdownList
					:elements="ROLES_FILTERS"
					id="roles"
					title="Роль пользователя"
				/>
				<BaseDropdownList
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