import { ChartConfiguration } from "chart.js";
import type { TypeThemes } from "@/types/TypeThemes";
import type { IChartColors } from "@/interfaces/IChartColors";


export const chartConfig = (data: number[], labels: string[], colors: IChartColors, theme: TypeThemes): ChartConfiguration => ({
	type: "line",
	data: {
		labels: labels,
		datasets: [
			{
				backgroundColor: colors.backgroundColor,
				borderColor: colors.borderColor,
				borderJoinStyle: "round",
				borderWidth: 2,
				data: data,
				fill: true,
				pointBackgroundColor: colors.pointBackgroundColor,
				pointHitRadius: 20,
				pointRadius: 6,
				hoverBackgroundColor: colors.borderColor,
				hoverBorderColor: colors.borderColor,
				hoverRadius: 10,
				tension: 0.4,
			}
		],
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		layout: {
			padding: {
				top: 10
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				enabled: false
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				border: {
					dash: [10, 15],
					display: false
				},
				grid: {
					color: theme === "light" ? "#EDEFFD" : "#363949",
					tickLength: 10,
					tickWidth: 0
				},
				ticks: {
					display: false,
					stepSize: 50
				}
			},
			x: {
				border: {
					color: theme === "light" ? "#EDEFFD" : "#363949",
					display: true
				},
				grid: {
					display: false
				},
				ticks: {
					color: theme === "light" ? "#677483" : "#A3BDCC",
					font: {
						size: 14,
					}
				}
			}
		},
		hover: {
			mode: "nearest",
			intersect: true
		}
	}
});
