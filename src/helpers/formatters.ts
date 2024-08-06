export const onFormatPrice = (price: number): string => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;

export const onFormatPhone = (phone: string): string => `${phone[0] === "7" ? "+7" : "8"} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;

export const onFormatMonth = (month: number): string => {
	const months: Record<number, string> = {
		0: "Январь",
		1: "Февраль",
		2: "Март",
		3: "Апрель",
		4: "Май",
		5: "Июнь",
		6: "Июль",
		7: "Август",
		8: "Сентябрь",
		9: "Октябрь",
		10: "Ноябрь",
		11: "Декабрь",
	}

	return months[month];
}