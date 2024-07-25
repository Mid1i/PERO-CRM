export interface IRecentOrder {
	id: number,
	creationDate: string,
	totalPrice: number,
	status: "Оплачен" | "Доставлен" | "Отменен"
};