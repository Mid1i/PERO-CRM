<script setup lang="ts">
	import { Ref, computed, inject } from "vue";
	import { RouterLink } from "vue-router";
	import type { TypeWeekDays } from "@/types/TypeWeekDays";
	import type { TypeThemes } from "@/types/TypeThemes";
	import RecentOrder from "@/components/RecentOrder.vue";
	import WeekChart from "@/components/WeekChart.vue";
	import Analytics from "@/components/Analytics.vue";
	import Widget from "@/components/Widget.vue";
	import { chartConfig } from "@/plugins/chartConfig";
	import { 
		ANALYTICS, 
		RECENT_ORDERS, 
		SALES_COLORS, 
		USERS_COLORS, 
		WEEK_SALES, 
		WEEK_USERS, 
		WIDGETS 
	} from "@/constants";


	const theme = <Ref<TypeThemes>>inject("theme");


	const getLabelsForChart = computed<TypeWeekDays[]>(() => {
		let date = new Date();
		let days: TypeWeekDays[] = [];

		for (let i = 0; i < 6; i++) {
			const WEEK_DAYS: Record<string, TypeWeekDays> = {
				0: "Вс",
				1: "Пн",
				2: "Вт",
				3: "Ср",
				4: "Чт",
				5: "Пт",
				6: "Сб"
			};
			
			days.push(WEEK_DAYS[date.getDay()]);
			date.setDate(date.getDate() - 1);
		}

		return days;
	});
</script>

<template>
	<main class="content">
		<div class="content__left">
			<div class="content__left-widgets">
				<Widget
					v-for="widget in WIDGETS"
					:key="widget.title"
					:="widget"
				/>
			</div>
			<section class="content__left-orders">
				<h2 class="content__title">Недавние заказы</h2>
				<table class="content__left-table">
					<tr class="content__left-row">
						<th class="content__left-header">№</th>
						<th class="content__left-header">Дата создания</th>
						<th class="content__left-header">Сумма заказа</th>
						<th class="content__left-header">Статус</th>
					</tr>
					<RecentOrder
						v-for="order in RECENT_ORDERS"
						:key="order.id"
						:="order"
					/>
				</table>
				<RouterLink class="content__left-button" to="/orders">Показать все</RouterLink>
			</section>
		</div>
		<aside class="content__right">
			<section class="content__right-analytics">
				<h2 class="content__right-title content__title">Аналитика по продажам</h2>
				<Analytics
					v-for="analytics in ANALYTICS"
					:key="analytics.title"
					:="analytics"
				/>
			</section>
			<WeekChart
				title="Продажи"
				:config="chartConfig(WEEK_SALES, getLabelsForChart, SALES_COLORS, theme)"
			/>
			<WeekChart
				title="Новые пользователи"
				:config="chartConfig(WEEK_USERS, getLabelsForChart, USERS_COLORS, theme)"
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

		&__title {
			@include h2;
			z-index: 1;
		}

		&__left {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			gap: 20px;

			&-widgets {
				display: flex;
				gap: 40px;
			}

			&-orders {
				display: flex;
				flex-direction: column;
				gap: 20px;
			}

			&-table {
				@include layout;
				width: 100%;
			}

			&-row {
				display: grid;
				grid-template-columns: repeat(5, 1fr);
				gap: 20px;
			}

			&-header {
				@include h3;
				text-align: left;
			}

			&-button {
				align-self: center;

				@include text;
				color: $--blue;
				font-size: 16px;

				z-index: 1;
			}
		}

		&__right {
			display: flex;
			flex: 0 0 415px;
			flex-direction: column;
			gap: 40px;

			&-item {
				margin-bottom: 5px;
			}

			&-analytics {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
		}
	}


	@media(hover: hover) {
		.content__left-button:hover {
			text-decoration: underline;
		}
	}
</style>