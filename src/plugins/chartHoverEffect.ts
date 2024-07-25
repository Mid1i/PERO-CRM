import { Chart, InteractionItem } from "chart.js";


export const onChartHover = (event: Event, chart: Chart): InteractionItem | null => {
	const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false);

	return (points.length) ? points[0] : null;
}