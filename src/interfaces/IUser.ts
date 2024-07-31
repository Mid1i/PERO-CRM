export interface IUser {
	id: number,
	active: boolean,
	avatar: string,
	login: string,
	email: string,
	phone: number,
	country: "Россия" | "Белоруссия" | "Другая",
	role: "Покупатель" | "Администратор" | "Менеджер" | "Заблокирован",
	dateOfBirth: string,
	dateOfRegistration: string
}