import { Chart, Element, InteractionItem } from "chart.js";
import type { TypeThemes } from "@/types/TypeThemes";


export const onDrawDatasets = (chart: Chart, hoveredPoint: InteractionItem | null, theme: TypeThemes) => {
	const ctx = chart.ctx;
	
	ctx.fillStyle = theme === "light" ? "#363949" : "#EDEFFD";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	
	chart.config.data.datasets.forEach((dataset, datasetIndex) => {
		const meta = chart.getDatasetMeta(datasetIndex);
			
		const hoveredPointIndex = hoveredPoint?.index;
		const hoveredPointDatasetIndex = hoveredPoint?.datasetIndex;

		const hoveredPointPosition = hoveredPoint ? { x: hoveredPoint?.element.x, y: hoveredPoint?.element.y } : null;

		if (!meta.hidden) {
			meta.data.forEach((point, index) => {
				const data = dataset.data[index];
	
				const isHoveredDataset = datasetIndex === hoveredPointDatasetIndex;
				const isHoveredPoint = index === hoveredPointIndex && isHoveredDataset;

				const isNeighboringPoint = hoveredPointPosition?.x ? (Math.abs(point.x - hoveredPointPosition.x) < 40 && Math.abs(point.y - hoveredPointPosition.y) < 20) : false;
	
				if (!isNeighboringPoint || isHoveredPoint) onDrawPoint(ctx, String(data), point, isHoveredPoint);
			});
		}
	});
};


const onDrawPoint = (ctx: CanvasRenderingContext2D, data: string, point: Element, isActive: boolean = false): void => {
	ctx.font = `${isActive ? "600 18px" : "500 14px"} Rubik`;
	ctx.fillText(String(data), point.x, point.y - 10);
};
