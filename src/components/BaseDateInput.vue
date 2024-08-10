<script setup lang="ts">
	import { computed, inject, ref } from "vue";
	import type { TypeUserFilters } from "@/types/TypeUserFilters";
	import BaseCalendar from "@/components/BaseCalendar.vue";
	import { useFilters } from "@/composables/useFilters";
	import { usePopup } from "@/composables/UsePopup";
	import { addLeadingZeros } from "@/helpers/words";

	
	const props = defineProps<{
		isActive: boolean,
		step: "from" | "to",
		id: keyof TypeUserFilters,
	}>();

	const userDate = ref<Date | null>(null);

	const { updateFilters } = useFilters();
	const { togglePopup } = usePopup();

	const setActivePopup = inject<(id: string | null) => string | null>("setActivePopup");

	const toggleCalendar = (): void => {
		setActivePopup && setActivePopup(`${props.id},${props.step}`);
		togglePopup();
	};

	const updateUserDate = (date: Date): void => {
		updateFilters({ [props.step]: date }, props.id);
		userDate.value = date;
		toggleCalendar();
	};

	const onClearDate = (): void => {
		setActivePopup && setActivePopup(null);
		updateFilters({ [props.step]: undefined }, props.id);
		userDate.value = null;
	}

	const getFormattedDate = computed<string>(() => {
		const date = userDate.value;
		return date ? `${addLeadingZeros(date.getDate())}.${addLeadingZeros(date.getMonth() + 1)}.${addLeadingZeros(date.getFullYear())}` : "";
	});
</script>


<template>
	<div class="wrapper">
		<button @click="toggleCalendar" class="wrapper__button">
			{{ getFormattedDate }}
			<svg class="wrapper__button-icon" fill="none" height="20" viewBox="0 0 18 20" width="18">
				<path d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM6 12H4V10H6V12ZM10 12H8V10H10V12ZM14 12H12V10H14V12ZM6 16H4V14H6V16ZM10 16H8V14H10V16ZM14 16H12V14H14V16Z" fill="#A3BDCC"/>
			</svg>
		</button>
		<button 
			@click="onClearDate"
			:class="['wrapper__cross', { active: !!userDate }]"
		>
			<svg fill="none" height="20" viewBox="0 0 20 20" width="20">
				<path d="M10 12.1293L2.54753 19.5817C2.26869 19.8606 1.91381 20 1.48289 20C1.05196 20 0.697084 19.8606 0.41825 19.5817C0.139416 19.3029 0 18.948 0 18.5171C0 18.0862 0.139416 17.7313 0.41825 17.4525L7.87072 10L0.41825 2.54753C0.139416 2.26869 0 1.91381 0 1.48289C0 1.05196 0.139416 0.697084 0.41825 0.41825C0.697084 0.139416 1.05196 0 1.48289 0C1.91381 0 2.26869 0.139416 2.54753 0.41825L10 7.87072L17.4525 0.41825C17.7313 0.139416 18.0862 0 18.5171 0C18.948 0 19.3029 0.139416 19.5817 0.41825C19.8606 0.697084 20 1.05196 20 1.48289C20 1.91381 19.8606 2.26869 19.5817 2.54753L12.1293 10L19.5817 17.4525C19.8606 17.7313 20 18.0862 20 18.5171C20 18.948 19.8606 19.3029 19.5817 19.5817C19.3029 19.8606 18.948 20 18.5171 20C18.0862 20 17.7313 19.8606 17.4525 19.5817L10 12.1293Z" fill="currentColor"/>
			</svg>
		</button>
		<BaseCalendar
			@update-date="updateUserDate"
			:is-active="isActive"
			:user-date="userDate"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.wrapper {
		box-shadow: 0px 32px 48px 0px $--box-shadow;

		position: relative;
		height: 40px;
		width: 180px;

		&__button {
			appearance: none;
			background: $--background-secondary;
			border: 1px solid transparent;
			display: block;

			@include h3;
			cursor: pointer;
			text-align: left;

			position: relative;
			padding: 10px 15px;
			height: 100%;
			width: 100%;

			&-icon {
				cursor: pointer;
				position: absolute;
				right: 15px;
				top: 50%;

				transform: translateY(-50%);

				& path {
					fill: $--text-secondary;
				}
			}
		}

		&__cross {
			position: absolute;
			right: -20px;
			top: 50%;

			transform: translateY(-50%);
			pointer-events: none;
			opacity: 0;

			height: 12px;
			width: 12px;

			& svg {
				height: 100%;
				width: 100%;

				& path {
					fill: $--text-primary;
				}
			}

			&.active {
				pointer-events: auto;
				opacity: 1;
			}
		}
	}


	@media(hover: hover) {
		.wrapper:hover .wrapper__button {
			border-color: $--text-secondary;
		}
	}
</style>