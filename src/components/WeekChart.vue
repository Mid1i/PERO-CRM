<script setup lang="ts">
	import { Chart, ChartConfiguration, Plugin } from "chart.js/auto";
	import { onDrawDatasets } from "@/plugins/chartDatasetDraw";
	import { useChart } from "@/composables/UseChart";


	const props = defineProps<{
		title: string,
		config: ChartConfiguration
	}>();

	const onCreateChart = (): void => {
		if (canvasRef.value) {
			onDestroyChart();
			
			const afterDatasetsDraw: Plugin = {
				id: "afterDatasetsDraw",
				afterDatasetsDraw: (chart: Chart): void => onDrawDatasets(chart, theme.value)
			}
			
			chart = new Chart(canvasRef.value, {
				...props.config,
				plugins: [afterDatasetsDraw]
			});
		}
	};

	let { canvasRef, chart, onDestroyChart, theme } = useChart(onCreateChart);
</script>


<template>
	<section class="chart">
		<h3 class="chart__title">{{ title }}</h3>
		<div class="chart__container">
			<canvas ref="canvasRef"	class="chart__canvas"></canvas>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.chart {
		@include layout;
		gap: 15px;

		width: 100%;

		&__title {
			@include h3;
		}

		&__container {
			height: 110px;
			width: 100%;
		}

		&__canvas {
			height: 100%;
			width: 100%;
		}
	}
</style>