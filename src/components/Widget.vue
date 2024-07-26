<script setup lang="ts">
	import { Ref, ref, onMounted, inject, watch } from "vue";
	import type { TypeThemes } from "@/types/TypeThemes";
	import type { IWidget } from "@/interfaces/IWidget";
	import { onFormatPrice } from "@/helpers/formatters";


	const props = defineProps<IWidget>();

	const canvasRef = ref<HTMLCanvasElement>();
	const theme = <Ref<TypeThemes>>inject("theme");

	
	const drawProgressCircle = (): void => {
		if (canvasRef.value) {
			const ctx = <CanvasRenderingContext2D>canvasRef.value.getContext("2d");
			const width = canvasRef.value.width;
			const height = canvasRef.value.height;
			let currentPercentage = 0;

			const drawCircle = (percentage: number): void => {
				const endAngle = (2 * Math.PI * percentage) / 100;

				ctx.beginPath();
				ctx.arc(width / 2, height / 2, 80, -Math.PI / 2, endAngle - Math.PI / 2);
				ctx.strokeStyle = "#7380EC";
				ctx.lineWidth = 20;
				ctx.stroke();
			}

			const drawText = (percentage: number): void => {
				ctx.font = "30px Rubik";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillStyle = theme.value === "light" ? "#677483" : "#A3BDCC";
				ctx.fillText(`${percentage} %`, width / 2, height / 2);
			}

			const animateProgress = (): void => {
				ctx.clearRect(0, 0, width, height);
				drawCircle(currentPercentage);
				drawText(currentPercentage);
	
				if (currentPercentage < props.percentage) {
					currentPercentage += 2;
					currentPercentage > props.percentage && (currentPercentage = props.percentage);
					requestAnimationFrame(animateProgress);
				}
			}

			animateProgress();
		}
	}


	onMounted(drawProgressCircle);
	watch(theme, drawProgressCircle);
</script>


<template>
	<section class="widget">
		<header 
			v-html="icon"
			:class="[
				'widget__icon',
				title === 'Общие продажи' && 'sales',
				title === 'Общие затраты' && 'expenses'
			]" 
		></header>
		<h3 class="widget__title">{{ title }}</h3>
		<span class="widget__value">{{ title === "Общие продажи" ? value : onFormatPrice(value) }}</span>
		<footer class="widget__text">За неделю</footer>
		
		<canvas class="widget__progress" ref="canvasRef" height="200" width="200"></canvas>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.widget {
		@include layout;

		position: relative;
		max-width: 355px;
		width: 100%;

		&__icon {
			align-items: center;
			display: flex;
			justify-content: center;

			background: $--green;
			border-radius: 100%;
			color: $--background-secondary;

			margin-bottom: 20px;
			height: 40px;
			width: 40px;

			&.sales {
				background: $--blue;
			}

			&.expenses {
				background: $--red;
			}
		}

		&__title {
			@include h3;
			margin-bottom: 10px;
		}

		&__value {
			color: $--text-primary;
			font-size: 32px;
			font-weight: 700;

			margin-bottom: 30px;
		}

		&__text {
			@include text;
		}

		&__progress {
			position: absolute;
			right: 20px;
			top: 55%;
			
			transform: translateY(-50%);
			height: 120px;
			width: 120px;
		}
	}
</style>