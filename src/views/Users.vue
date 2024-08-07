<script setup lang="ts">
	import { ref, computed, watch, provide } from "vue";
	import type { IUser } from "@/interfaces/IUser";
	import type { IFilters } from "@/interfaces/IFilters";
	import type { TypeSorting } from "@/types/TypeSorting";
	import type { TypeUserFilters, TypeUserFiltersDates, TypeUserFiltersValues } from "@/types/TypeUserFilters";
	import UsersStatistics from "@/components/UsersStatistics.vue";
	import UsersFilters from "@/components/UsersFilters.vue";
	import UsersSorting from "@/components/UsersSorting.vue";
	import UsersSearch from "@/components/UsersSearch.vue";
	import UsersTable from "@/components/UsersTable.vue";
	import Pagination from "@/components/Pagination.vue";
	import WeekChart from "@/components/WeekChart.vue";
	import { getLabelsForChart } from "@/helpers/charts";
	import { chartConfig } from "@/plugins/chartConfig";
	import { getWordByAmount } from "@/helpers/words";
	import { usePopup } from "@/composables/popup";
	import { useTheme } from "@/composables/theme";
	import { USERS } from "@/users";
	import {
		USERS_COLORS, 
		WEEK_USERS, 
	} from "@/constants";
	import { IDate } from "@/interfaces/IDate"


	const { theme } = useTheme();

	const currentPage = ref<number>(1);
	const currentSorting = ref<TypeSorting | null>(null);
	const currentFilters = ref<IFilters>({
		isActive: null,
		countries: [],
		roles: [],
		dateOfBirth: {},
		dateOfRegistration: {}
	});

	const { isActivePopup: isActiveSearch, togglePopup: toggleSearchPopup } = usePopup();
	const { isActivePopup: isActiveSorting, togglePopup: toggleSortingPopup } = usePopup();
	const { isActivePopup: isActiveFilters, togglePopup: toggleFiltersPopup } = usePopup();


	const switchSorting = (value: TypeSorting): TypeSorting | null => currentSorting.value = currentSorting.value === value ? null : value;

	const searchUser = (request: string): IUser[] => request ? USERS.filter(user => user.login.toLowerCase().includes(request) || user.email.toLowerCase().includes(request)) : [];


	const isInFilters = (element: TypeUserFiltersValues, id: TypeUserFilters): boolean => {
		const currentFilter = currentFilters.value?.[id];
		
		if (Array.isArray(currentFilter)) return !!currentFilter.find(value => value === element);
		
		return currentFilter === element;
	}

	const updateDateFilters = (element: IDate, id: TypeUserFiltersDates): void => {
		currentFilters.value = {
			...currentFilters.value,
			[id]: {
				...currentFilters.value?.[id],
				...element
			}
		}
	}

	const updateFilters = (element: TypeUserFiltersValues, id: TypeUserFilters): void => {
		const currentFilter = currentFilters.value?.[id];
		
		if (Array.isArray(currentFilter)) {
		 	currentFilters.value =  {
				...currentFilters.value, 
				[id]: isInFilters(element, id) ? [...currentFilter.filter(value => value !== element)] : [...currentFilter, element]
			};

			return;
		}

		if (element === "Активный"  || element === "Неактивный") {
			currentFilters.value = {
				...currentFilters.value, 
				isActive: isInFilters(element, id) ? null : element
			};

			return;
		}
	}

	provide("updateDateFilters", updateDateFilters);
	provide("updateFilters", updateFilters);
	provide("isInFilters", isInFilters)


	const getTableFooterString = computed<string>(() => {
		const amount = USERS.length;
		return `${currentPage.value} страница из ${Math.ceil(amount / 11)} (${getWordByAmount(amount, "пользователь", "пользователя", "пользователей")})`;
	});


	watch(currentFilters, () => console.log(currentFilters.value))
</script>

<template>
  <main class="content">
		<div class="content__left">
			<div class="content__left-wrapper">
				<UsersTable
					:current-page="currentPage"
					:users="USERS"
				/>
			</div>
			<footer class="content__left-footer">
				<Pagination 
					@switchPage="(newPage: number) => currentPage = newPage"
					:pages="Math.ceil(USERS.length / 10)"
					:currentPage="currentPage"
				/>
				<p class="content__left-pages">{{ getTableFooterString }}</p>
			</footer>
		</div>
		<aside class="content__right">
			<div class="content__right-row">
				<button @click="toggleSearchPopup" class="content__right-button">
					<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
						<path class="fill" d="M14.2939 12.5786H13.3905L13.0703 12.2699C14.191 10.9663 14.8656 9.27387 14.8656 7.43282C14.8656 3.32762 11.538 0 7.43282 0C3.32762 0 0 3.32762 0 7.43282C0 11.538 3.32762 14.8656 7.43282 14.8656C9.27387 14.8656 10.9663 14.191 12.2699 13.0703L12.5786 13.3905V14.2939L18.2962 20L20 18.2962L14.2939 12.5786ZM7.43282 12.5786C4.58548 12.5786 2.28702 10.2802 2.28702 7.43282C2.28702 4.58548 4.58548 2.28702 7.43282 2.28702C10.2802 2.28702 12.5786 4.58548 12.5786 7.43282C12.5786 10.2802 10.2802 12.5786 7.43282 12.5786Z"/>
					</svg>
				</button>
				<button @click="toggleSortingPopup" class="content__right-button">
					<svg fill="none" height="14" viewBox="0 0 21 14" width="21">
						<path class="fill" d="M0.25 14H6.91667V11.6667H0.25V14ZM0.25 0V2.33333H20.25V0H0.25ZM0.25 8.16667H13.5833V5.83333H0.25V8.16667Z"/>
					</svg>
				</button>
				<button @click="toggleFiltersPopup" class="content__right-button">
					<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
						<path class="fill" d="M0.765947 2.0125C3.30472 5.25 7.99265 11.25 7.99265 11.25V18.75C7.99265 19.4375 8.55822 20 9.24947 20H11.7631C12.4544 20 13.0199 19.4375 13.0199 18.75V11.25C13.0199 11.25 17.6953 5.25 20.2341 2.0125C20.875 1.1875 20.2843 0 19.2412 0H1.75883C0.715675 0 0.12497 1.1875 0.765947 2.0125Z"/>
					</svg>
				</button>
				<button class="content__right-button">
					<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
						<path class="stroke" d="M10.75 0V9.45984M10.75 9.45984V20M10.75 9.45984H0.75M10.75 9.45984H20.75" stroke-width="2"/>
					</svg>
				</button>
				<button class="content__right-button">
					<svg fill="none" height="18" viewBox="0 0 20 18" width="20">
						<path class="fill" d="M0 9C0 11.3869 0.903059 13.6761 2.51051 15.364C4.11797 17.0518 6.29814 18 8.57143 18C10.8476 18 13.0286 17.06 14.6667 15.4L13.2381 13.9C12.6385 14.5667 11.915 15.0971 11.1122 15.4583C10.3095 15.8196 9.44475 16.0039 8.57143 16C2.62857 16 -0.342857 8.46 3.85714 4.05C8.05714 -0.36 15.2381 2.77 15.2381 9H12.381L16.1905 13H16.2857L20 9H17.1429C17.1429 6.61305 16.2398 4.32387 14.6323 2.63604C13.0249 0.948211 10.8447 0 8.57143 0C6.29814 0 4.11797 0.948211 2.51051 2.63604C0.903059 4.32387 0 6.61305 0 9Z"/>
					</svg>
				</button>
			</div>
			<div class="content__right-charts">
				<h3 class="content__right-title">Общая статистика по пользователям</h3>
				<div class="content__right-row">
					<UsersStatistics
						:data="[55, 45]"
						:colors="['rgb(115, 128, 236)', 'rgb(255, 119, 130)']"
						:labels="['Мужчины', 'Женщины']"
					/>
					<UsersStatistics
						:data="[60, 15, 25]"
						:colors="['rgb(115, 128, 236)', 'rgb(65, 241, 182)', 'rgb(255, 187, 85)']"
						:labels="['Россия', 'Белоруссия', 'Другие']"
					/>
					<UsersStatistics
						:data="[40, 40, 20]"
						:colors="['rgb(65, 241, 182)', 'rgb(255, 187, 85)', 'rgb(255, 119, 130)']"
						:labels="['18-30 лет', '30-60 лет', '60+ лет']"
					/>
				</div>
			</div>
			<WeekChart
				title="Новые пользователи"
				:config="chartConfig(WEEK_USERS, getLabelsForChart(), USERS_COLORS, theme)"
			/>
		</aside>
	</main>

	<UsersSearch 
		@close-popup="toggleSearchPopup"
		:search-user="searchUser"
		:is-visible="isActiveSearch"
	/>

	<UsersSorting
		@close-popup="toggleSortingPopup"
		@switch-sorting="switchSorting"
		:is-visible="isActiveSorting"
		:current-sorting="currentSorting"
	/>

	<UsersFilters
		@close-popup="toggleFiltersPopup"
		:is-visible="isActiveFilters"
	/>
</template>

<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.content {
		display: flex;
		gap: 40px;

		height: 100%;

		&__left {
			@include layout;
			flex: 1 0 auto;
			height: 100%;

			&-wrapper {
				display: flex;
				flex: 1 0 auto;
				width: 100%;
			}

			&-footer {
				border-top: 1px solid $--background-primary;

				align-items: center;
				display: flex;
				justify-content: space-between;

				padding-top: 25px;
			}

			&-pages {
				@include text;
				color: $--text-secondary;
			}
		}

		&__right {
			display: flex;
			flex: 0 0 415px;
			flex-direction: column;
			gap: 40px;

			&-button {
				border: 1px dashed $--blue;
				border-radius: 25px;

				align-items: center;
				display: flex;
				justify-content: center;

				height: 40px;
				width: 60px;

				& .fill {
					fill: $--blue;
				}

				& .stroke {
					stroke: $--blue;
				}
			}

			&-charts {
				@include layout;
				gap: 15px;
			}

			&-row {
				align-items: flex-start;
				display: flex;
				justify-content: space-between;
			}

			&-title {
				@include h3;
			}
		}
	}


	@media(hover: hover) {
		.content__right-button:hover {
			background: $--blue;
			
			& .fill {
					fill: $--white;
				}

				& .stroke {
					stroke: $--white;
				}
		}
	}
</style>