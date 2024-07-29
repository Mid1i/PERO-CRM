export interface IUser {
	login: string,
	email: string,
	phone: number,
	country: "Россия" | "Белоруссия" | "Другая",
	dateOfBirth: string,
	dateOfRegistration: string
}