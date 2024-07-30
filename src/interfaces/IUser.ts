export interface IUser {
	id: number,
	avatar: string,
	login: string,
	email: string,
	phone: number,
	country: "Россия" | "Белоруссия" | "Другая",
	dateOfBirth: string,
	dateOfRegistration: string
}