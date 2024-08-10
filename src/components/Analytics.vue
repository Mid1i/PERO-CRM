<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import type { IAnalytics } from "@/interfaces/IAnalytics";


	const props = defineProps<IAnalytics>();

	const percentage = ref(0);

	const animatePercentage = (): void => {
		const calculatedPercentage = Math.ceil(props.value / props.previousValue * 100 - 100);
		const startTime = performance.now();

		const animate = (currentTime: number): void => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / 1000, 1);
			
			percentage.value = Math.floor(calculatedPercentage * progress);
			progress < 1 && requestAnimationFrame(animate);
		}

		requestAnimationFrame(animate);
	}

	onMounted(animatePercentage);
</script>


<template>
	<section class="analytics-item">
		<div :class="['analytics-item__icon', { online: title === 'Онлайн заказы' }, { offline: title === 'Офлайн заказы' }]" v-html="icon"></div>
		<div class="analytics-item__col">
			<h3 class="analytics-item__title">{{ title }}</h3>
			<p class="analytics-item__text">За неделю</p>
		</div>
		<span :class="['analytics-item__value', { increased: previousValue < value }, { decreased: previousValue > value }]">
			{{ `${previousValue < value ? "+" : ""}${percentage}%` }}
		</span>
		<span class="analytics-item__value">{{ value }}</span>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.analytics-item {
		@include layout;
		flex-direction: row;
		gap: 15px;

		&__icon {
			align-items: center;
			display: flex;
			flex: 0 0 auto;
			justify-content: center;

			background: $--green;
			border-radius: 100%;
			color: $--background-secondary;

			height: 40px;
			width: 40px;

			&.online {
				background: $--blue;
			}

			&.offline {
				background: $--red;
			}
		}

		&__col {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			gap: 5px;
		}

		&__title {
			@include h3;
			text-transform: uppercase;
		}

		&__text {
			@include text;
		}

		&__value {
			@include h3;

			text-align: center;
			width: 40px;

			&.increased {
				color: $--green;
			}

			&.decreased {
				color: $--red;
			}
		}
	}
</style>