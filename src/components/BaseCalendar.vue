<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { IDay } from "@/interfaces/IDay";
	import { onFormatMonth } from "@/helpers/formatters";
	import { CALENDAR_HEADERS } from "@/constants";
	import { getDay } from "@/helpers/calendar";


	const props = defineProps<{
		isActive: boolean
		inputDate: Date | null
	}>();

	defineEmits<{
		(e: "changeDate", date: Date): void
	}>();

	const calendarContent = ref<"calendar" | "months" | "years">("calendar");
	const currentYearsPage = ref<number>(0);

	const currentDate = props.inputDate || new Date();
	const currentYear = ref<number>(currentDate.getFullYear());
	const currentMonth = ref<number>(currentDate.getMonth());

	const isSelected = (date: Date): boolean => props.inputDate?.getTime() === date.getTime();

	const setYear = (year: number): void => {
		calendarContent.value = "calendar";
		currentYear.value = year;
	}

	const setMonth = (month: number): void => {
		calendarContent.value = "calendar";
		currentMonth.value = month;
	}

	const changeMonth = (isPrevious: boolean): void => {
		if (isPrevious) {
				currentMonth.value = (currentMonth.value + 11) % 12;
				if (currentMonth.value === 11) currentYear.value--;
		} else {
				currentMonth.value = (currentMonth.value + 1) % 12;
				if (currentMonth.value === 0) currentYear.value++;
		}
	}

	const getMonthDates = computed<IDay[]>(() => {
		let date = new Date(currentYear.value, currentMonth.value);
		const firstDayOfMonth: number = getDay(date);
		const monthDates: IDay[] = [];
		
		date.setDate(date.getDate() - firstDayOfMonth);

		const previousMonthCondition = (): boolean => monthDates.length < firstDayOfMonth;
		const currentMonthCondition = (): boolean => date.getMonth() === currentMonth.value;
		const nextMonthCondition = (): boolean => getDay(date) !== 0 && getDay(date) < 7;
		
		while (previousMonthCondition() || currentMonthCondition() || nextMonthCondition()) {
			monthDates.push({
				date: new Date(date),
				isMuted: !currentMonthCondition()
			});
			
			date.setDate(date.getDate() + 1);
		}
		
		return monthDates;
	});

	const getYears = computed<number[]>(() => {
		const nearestYear = currentYear.value - (currentYear.value % 10) + 10 * currentYearsPage.value;
		return Array.from({ length: 21 }, (_, i) => nearestYear + i);
	})
</script>


<template>
	<div :class="['calendar', { active: isActive }]">
		<div :class="['calendar__main', { active: calendarContent === 'calendar' && isActive }]">
			<header class="calendar__header">
				<div class="calendar__header-month">
					<button @click="() => changeMonth(true)" class="calendar__header-icon">
						<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
							<path d="M8 1.645L3.05533 7L8 12.355L6.47773 14L3.71833e-08 7L6.47773 0L8 1.645Z" fill="#EDEFFD"/>
						</svg>
					</button>
					<button @click="() => calendarContent = 'months'" class="calendar__header-button month">{{ onFormatMonth(currentMonth) }}</button>
					<button @click="() => changeMonth(false)" class="calendar__header-icon">
						<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
							<path d="M0 12.355L4.94467 7L0 1.645L1.52227 4.76837e-07L8 7L1.52227 14L0 12.355Z" fill="#EDEFFD"/>
						</svg>
					</button>
				</div>
				<div class="calendar__header-year">
					<button @click="() => setYear(currentYear - 1)" class="calendar__header-icon">
						<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
							<path d="M8 1.645L3.05533 7L8 12.355L6.47773 14L3.71833e-08 7L6.47773 0L8 1.645Z" fill="#EDEFFD"/>
						</svg>
					</button>
					<button @click="() => calendarContent = 'years'" class="calendar__header-button">{{ currentYear }}</button>
					<button @click="() => setYear(currentYear + 1)" class="calendar__header-icon">
						<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
							<path d="M0 12.355L4.94467 7L0 1.645L1.52227 4.76837e-07L8 7L1.52227 14L0 12.355Z" fill="#EDEFFD"/>
						</svg>
					</button>
				</div>
			</header>
			<div class="calendar__body">
				<span 
					v-for="header in CALENDAR_HEADERS"
					:key="header"
					class="calendar__body-header"
				>
					{{ header }}
				</span>
				<span
					v-for="{ date, isMuted }, index) in getMonthDates"
					@click="$emit('changeDate', date)"
					:class="['calendar__body-item', { selected: isSelected(date) }, { muted: isMuted }]"
					:key="index"
				>
					{{ date.getDate() }}
				</span>
			</div>
		</div>
		<ul :class="['calendar__months', { active: calendarContent === 'months' && isActive }]">
			<li 
				v-for="month of 12"
				@click="() => setMonth(month - 1)"
				:class="['calendar__months-el', { selected: currentMonth === month - 1 }]"
				:key="month"
			>
				{{ onFormatMonth(month - 1) }}
			</li>
		</ul>
		<div :class="['calendar__years', { active: calendarContent === 'years' && isActive }]">
			<button @click="() => currentYearsPage -= 1" class="calendar__years-button">
				<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
					<path d="M8 1.645L3.05533 7L8 12.355L6.47773 14L3.71833e-08 7L6.47773 0L8 1.645Z" fill="#EDEFFD"/>
				</svg>
			</button>
			<ul class="calendar__years-list">
				<li 
					v-for="year in getYears"
					@click="() => setYear(year)"
					:class="['calendar__years-el', { selected: currentYear === year }]"
					:key="year"
				>
					{{ year }}
				</li>
			</ul>
			<button @click="() => currentYearsPage += 1" class="calendar__years-button">
				<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
					<path d="M0 12.355L4.94467 7L0 1.645L1.52227 4.76837e-07L8 7L1.52227 14L0 12.355Z" fill="#EDEFFD"/>
				</svg>
			</button>
		</div>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.calendar {
		background: $--background-secondary;
		box-shadow: 0px 32px 48px 0px $--box-shadow;

		padding: 10px;

		pointer-events: none;
		opacity: 0;

		position: absolute;
		right: 0px;
		top: 110%;

		height: 290px;
		width: 275px;
		z-index: 10;

		&.active {
			pointer-events: auto;
			opacity: 1;
		}

		&__main,
		&__months,
		&__years {
			pointer-events: none;
			overflow: hidden;
			opacity: 0;

			height: 0px;

			&.active {
				pointer-events: auto;
				opacity: 1;

				height: 100%;
			}
		}

		&__main {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 10px;

			width: 100%;
		}

		&__months {
			display: flex;
			flex-wrap:wrap;

			width: 100%;

			&-el {
				align-items: center;
				display: flex;
				flex: 0 0 33%;
				justify-content: center;

				@include text;
				cursor: pointer;

				&.selected {
					color: $--blue;
				}
			}
		}

		&__years {
			align-items: stretch;
			display: flex;
			gap: 15px;

			&-button {
				flex: 0 0 auto;

				& path {
					fill: $--text-primary;
				}
			}

			&-list {
				display: flex;
				flex-wrap: wrap;
			}

			&-el {
				align-items: center;
				display: flex;
				flex: 0 0 33%;
				justify-content: center;

				@include text;
				cursor: pointer;

				&.selected {
					color: $--blue;
				}
			}
		}

		&__header {
			align-items: center;
			display: flex;
			gap: 10px;

			&-month,
			&-year {
				align-items: center;
				display: flex;
				gap: 2px;
			}

			&-month {
				flex: 1 0 auto;
				justify-content: space-between;
			}

			&-button {
				@include h3;
				font-weight: 500;

				border-radius: 5px;
				padding: 4px 0px;

				width: 55px;

				&.month {
					width: 100px;
				}
			}

			&-icon {
				border-radius: 5px;
				padding: 4px;

				& svg {
					height: 12px;
					width: 12px;
				}

				& path {
					fill: $--text-primary;
				}
			}
		}

		&__body {
			display: grid;
			gap: 5px;
			grid-template-columns: repeat(7, 30px);

			&-header,
			&-item {
				align-items: center;
				display: flex;
				justify-content: center;
			}

			&-header {
				@include h3;
				font-weight: 500;
			}

			&-item {
				border-radius: 5px;

				@include text;
				cursor: pointer;

				height: 30px;

				&.muted {
					color: $--text-tertiary;
				}

				&.selected {
					background: $--blue;
					color: $--text-primary;
				}
			}
		}
	}


	@media(hover: hover) {
		.calendar__body-item:not(.selected):hover {
			background: $--background-primary;
			color: $--text-primary;
		}

		.calendar__header-button:hover,
		.calendar__header-icon:hover {
			background: $--background-primary;
		}

		.calendar__months-el:not(.selected):hover,
		.calendar__years-el:not(.selected):hover {
			color: $--text-primary;
		}
	}
</style>