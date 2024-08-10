import { Chart, Element } from "chart.js";
import type { TypeThemes } from "@/types/TypeThemes";


export const drawDatasets = (chart: Chart, theme: TypeThemes) => {
	const ctx = chart.ctx;
	
	ctx.fillStyle = theme === "light" ? "#363949" : "#EDEFFD";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	
	chart.config.data.datasets.forEach((dataset, datasetIndex) => {
		const meta = chart.getDatasetMeta(datasetIndex);

		if (!meta.hidden) {
			meta.data.forEach((point, index) => {
				const data = dataset.data[index];
				drawPoint(ctx, String(data), point, point.active);
			});
		}
	});
};


const drawPoint = (ctx: CanvasRenderingContext2D, data: string, point: Element, isActive: boolean = false): void => {
	ctx.font = `${isActive ? "600 18px" : "500 14px"} Rubik`;
	ctx.fillText(String(data), point.x, point.y - 10);
};
