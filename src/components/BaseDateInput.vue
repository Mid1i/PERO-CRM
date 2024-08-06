<script setup lang="ts">
	import { ref, computed, inject } from "vue";
	import type { TypePopups } from "@/types/TypePopups";
	import BaseCalendar from "@/components/BaseCalendar.vue";
	import { addLeadingZeros } from "@/helpers/words";
	import { usePopup } from "@/composables/popup";

	
	const props = defineProps<{
		isActive: boolean,
		id: TypePopups
	}>();


	const switchCurrentPopup = <(id: TypePopups) => TypePopups>inject("switchCurrentPopup");

	const inputDate = ref<Date | null>(null);
	const { togglePopup } = usePopup();


	const toggleCalendar = (): void => {
		switchCurrentPopup(props.id);
		togglePopup();
	};

	const changeDate = (date: Date): void => {
		inputDate.value = date;
		toggleCalendar();
	};

	const onFormatValue = computed<string>(() => {
		const date = inputDate.value;
		return date ? `${addLeadingZeros(date.getDate())}.${addLeadingZeros(date.getMonth() + 1)}.${addLeadingZeros(date.getFullYear())}` : "";
	});
</script>


<template>
	<div class="wrapper">
		<button @click="toggleCalendar" class="wrapper__button">
			{{ onFormatValue }}
			<svg class="wrapper__button-icon" fill="none" height="20" viewBox="0 0 18 20" width="18">
				<path d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V8H16V18ZM6 12H4V10H6V12ZM10 12H8V10H10V12ZM14 12H12V10H14V12ZM6 16H4V14H6V16ZM10 16H8V14H10V16ZM14 16H12V14H14V16Z" fill="#A3BDCC"/>
			</svg>
		</button>
		<BaseCalendar
			@change-date="changeDate"
			:is-active="isActive"
			:input-date="inputDate"
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
	}


	@media(hover: hover) {
		.wrapper:hover .wrapper__button {
			border-color: $--text-secondary;
		}
	}
</style>