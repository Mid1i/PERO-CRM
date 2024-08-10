import {  Ref, ref, onMounted, onUnmounted, watch } from "vue";
import { Chart } from "chart.js/auto";
import type { TypeThemes } from "@/types/TypeThemes";
import { useTheme } from "@/composables/UseTheme";


type TypeUseChartReturn = {
	canvasRef: Ref<HTMLCanvasElement | null>,
	chart: Chart | null,
	destroyChart: () => void,
	theme: Ref<TypeThemes>
}


export const useChart = (createChart: () => void): TypeUseChartReturn => {
	const { theme } = useTheme();
	const canvasRef = ref<HTMLCanvasElement | null>(null);

	let chart: Chart | null = null;
	
	const destroyChart = (): void => { 
		if (chart) {
			chart.destroy();
			chart = null;
		}
	}

	onMounted(createChart);
	onUnmounted(destroyChart);
	watch(theme, createChart);


	return { 
		canvasRef, 
		chart, 
		destroyChart,
		theme
	};
}