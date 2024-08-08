<script setup lang="ts">
	import { Chart } from "chart.js/auto";
	import { useChart } from "@/composables/UseChart";
	import { chartConfig } from "@/plugins/doughnutChartConfig";


	const props = defineProps<{
		colors: string[],
		data: number[],
		labels: string[]
	}>();

	const onCreateChart = (): void => {
		if (canvasRef.value) {
			onDestroyChart();
			
			chart = new Chart(canvasRef.value, chartConfig(props.data, props.labels, props.colors, theme.value));
		}
	};

	let { canvasRef, chart, onDestroyChart, theme } = useChart(onCreateChart);
</script>


<template>
	<div class="chart">
		<div class="chart__container">
			<canvas class="chart__container-canvas" ref="canvasRef"></canvas>
		</div>
		<ul class="chart__list">
			<li
				v-for="(label, index) in labels"
				:key="label"
				class="chart__list-el"
			>
				<span :style="`background: ${colors[index]}`"	class="chart__list-box"></span>
				{{ label }}
			</li>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.chart {
		align-items: center;
		display: flex;
		flex: 0 0 30%;
		flex-direction: column;
		gap: 10px;

		&__container {
			height: 100px;
			width: 100%;

			&-canvas {
				height: 100%;
				width: 100%;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 10px;

			&-el {
				align-items: center;
				display: flex;
				gap: 5px;

				@include text;
			}

			&-box {
				border-radius: 5px;

				height: 14px;
				width: 14px;
			}
		}
	}
</style>