import type { TypeWeekDays } from "@/types/TypeWeekDays";


export const getWeekLabels = (): TypeWeekDays[] => {
	let date = new Date();
	let days: TypeWeekDays[] = [];

	for (let i = 0; i < 6; i++) {
		const WEEK_DAYS: Record<string, TypeWeekDays> = {
			0: "Вс",
			1: "Пн",
			2: "Вт",
			3: "Ср",
			4: "Чт",
			5: "Пт",
			6: "Сб"
		};
		
		days.push(WEEK_DAYS[date.getDay()]);
		date.setDate(date.getDate() - 1);
	}

	return days;
};