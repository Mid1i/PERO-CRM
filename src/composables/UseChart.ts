import {  Ref, ref, onMounted, onUnmounted, watch } from "vue";
import { Chart } from "chart.js/auto";
import type { TypeThemes } from "@/types/TypeThemes";
import { useTheme } from "@/composables/UseTheme";


type TypeUseChartReturn = {
	canvasRef: Ref<HTMLCanvasElement | null>,
	chart: Chart | null,
	onDestroyChart: () => void,
	theme: Ref<TypeThemes>
}


export const useChart = (onCreateChart: () => void): TypeUseChartReturn => {
	const { theme } = useTheme();
	const canvasRef = ref<HTMLCanvasElement | null>(null);

	let chart: Chart | null = null;
	
	const onDestroyChart = (): void => { 
		if (chart) {
			chart.destroy();
			chart = null;
		}
	}

	onMounted(onCreateChart);
	onUnmounted(onDestroyChart);
	watch(theme, onCreateChart);


	return { 
		canvasRef, 
		chart, 
		onDestroyChart,
		theme
	};
}