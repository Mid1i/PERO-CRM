export interface IUser {
	id: number,
	isActive: boolean,
	avatar: string,
	login: string,
	email: string,
	gender: boolean,
	phone: string,
	country: "Россия" | "Белоруссия" | "Грузия" | "Армения" | "Казахстан" | "Другая",
	role: "Покупатель" | "Администратор" | "Менеджер" | "Заблокирован",
	dateOfBirth: string,
	dateOfRegistration: string
}