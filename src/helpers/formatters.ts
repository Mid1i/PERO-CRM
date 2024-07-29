export const onFormatPrice = (price: number): string => `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;

export const onFormatPhone = (phone: number): string => {
	const strPhone = String(phone);
	return `${strPhone[0] === "7" ? "+7" : "8"} (${strPhone.slice(1, 4)}) ${strPhone.slice(4, 7)}-${strPhone.slice(7, 9)}-${strPhone.slice(9)}`;
}