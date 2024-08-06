export const getDay = (date: Date): number => {
	const day: number = date.getDay();

	return day === 0 ? 6 : day - 1;
}