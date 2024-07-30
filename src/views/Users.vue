<script setup lang="ts">
	import { Ref, inject, ref, computed } from "vue";
	import type { TypeThemes } from "@/types/TypeThemes";
	import UsersDoughnutChart from "@/components/UsersDoughnutChart.vue";
	import UsersTableHeader from "@/components/UsersTableHeader.vue";
	import UsersTableItem from "@/components/UsersTableItem.vue";
	import Pagination from "@/components/Pagination.vue";
	import WeekChart from "@/components/WeekChart.vue";
	import { getLabelsForChart } from "@/helpers/charts";
	import { chartConfig } from "@/plugins/chartConfig";
	import { getWordByAmount } from "@/helpers/words";
	import {
		USERS,
		USERS_COLORS, 
		USERS_TABLE_HEADERS, 
		WEEK_USERS, 
	} from "@/constants";


	const theme = <Ref<TypeThemes>>inject("theme");

	const currentPage = ref<number>(1);


	const getTableFooterString = computed<string>(() => {
		const amount = USERS.length;
		return `${currentPage.value} страница из ${Math.ceil(amount / 11)} (${getWordByAmount(amount, "пользователь", "пользователя", "пользователей")})`;
	});
</script>

<template>
  <main class="content">
		<div class="content__left">
			<div class="content__left-wrapper">
				<table class="content__left-table">
					<tr class="content__left-row">
						<UsersTableHeader 
							v-for="header in USERS_TABLE_HEADERS"
							:title="header"
							:key="header"
						/>
					</tr>
					<UsersTableItem
						v-for="user in USERS.slice((currentPage - 1) * 10, currentPage * 10)"
						:key="user.email"
						:="user"
					/>
				</table>
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
			<button class="content__right-button">
				<svg class="content__right-icon" fill="none" height="17" viewBox="0 0 16 17" width="16">
					<path class="fill" d="M0.212758 2.11C2.24378 4.7 5.99412 9.5 5.99412 9.5V15.5C5.99412 16.05 6.44657 16.5 6.99957 16.5H9.01048C9.56348 16.5 10.0159 16.05 10.0159 15.5V9.5C10.0159 9.5 13.7562 4.7 15.7872 2.11C16.3 1.45 15.8275 0.5 14.9929 0.5H1.00707C0.17254 0.5 -0.300024 1.45 0.212758 2.11Z" fill="currentColor"/>
				</svg>
				Фильтры
			</button>
			<button class="content__right-button">
				<svg class="content__right-icon" fill="none" height="17" viewBox="0 0 16 17" width="16">
					<path class="stroke" d="M8 0.5V8.06787M8 8.06787V16.5M8 8.06787H0M8 8.06787H16" stroke="currentColor" stroke-width="1.5"/>
				</svg>
				Добавить пользователя
			</button>
			<div class="content__right-charts">
				<h3 class="content__right-title">Общая статистика по пользователям</h3>
				<div class="content__right-row">
					<UsersDoughnutChart
						:data="[55, 45]"
						:colors="['rgb(115, 128, 236)', 'rgb(255, 119, 130)']"
						:labels="['Мужчины', 'Женщины']"
					/>
					<UsersDoughnutChart
						:data="[60, 15, 25]"
						:colors="['rgb(115, 128, 236)', 'rgb(65, 241, 182)', 'rgb(255, 187, 85)']"
						:labels="['Россия', 'Белоруссия', 'Другие']"
					/>
					<UsersDoughnutChart
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
				flex: 1 0 auto;
				width: 100%;
			}

			&-table {
				border-collapse: collapse;
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
				border-radius: 25px;
				border: 1px dashed $--blue;

				align-items: center;
				display: flex;
				justify-content: center;
				gap: 10px;

				font-size: 16px;
				color: $--blue;

				height: 60px;
				width: 100%;

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
			color: $--white;

			& .fill {
				fill: $--white;
			}

			& .stroke {
				stroke: $--white;
			}
		}
	}
</style>