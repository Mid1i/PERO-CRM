<script setup lang="ts">
	import { Ref, ref, onMounted, onUpdated, onUnmounted, inject } from "vue";
	import { InteractionItem, Chart, ChartConfiguration } from "chart.js/auto";
	import type { TypeThemes } from "@/types/TypeThemes"
	import { onDrawDatasets } from "@/plugins/chartDatasetDraw";
	import { onChartHover } from "@/plugins/chartHoverEffect";


	const props = defineProps<{
		title: string,
		config: ChartConfiguration,
		id: "sales" | "users"
	}>();
	

	const theme = <Ref<TypeThemes>>inject("theme");
	const canvasRef = ref<HTMLCanvasElement | null>(null);
	const hoveredPoint = ref<InteractionItem | null>(null);

	let chart: Chart | null = null;
	

	const hoverListener = (event: Event): void => {
		chart && (hoveredPoint.value = onChartHover(event, chart));
	}

	const destroyChart = (): void => { 
		chart && chart.destroy();
		canvasRef.value && canvasRef.value.removeEventListener("mousemove", hoverListener);
	}

	const createChart = (): void => {
		if (canvasRef.value) {
			destroyChart();
			
			if (!Chart.registry.plugins.get(`afterDatasetsDraw-${props.id}`)) {
				Chart.register({
					id: `afterDatasetsDraw-${props.id}`,
					afterDatasetsDraw: (chart: Chart) => onDrawDatasets(chart, hoveredPoint.value, theme.value)
				});
			}
			
				
			chart = new Chart(canvasRef.value, props.config);
			canvasRef.value.addEventListener("mousemove", hoverListener);
		}
	}

	onUpdated(createChart);
	onMounted(createChart);
	onUnmounted(destroyChart);
</script>


<template>
	<section class="chart">
		<h3 class="chart__title">{{ title }}</h3>
		<canvas 
			ref="canvasRef"
			class="chart__canvas" 
			height="100"
			width="325" 
		></canvas>
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

		&__canvas {
			height: 100px;
			width: 100%;
		}
	}
</style>