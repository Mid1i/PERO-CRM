import type { TypeUserCountries } from "@/types/TypeUserCountries";
import type { TypeUserRoles } from "@/types/TypeUserRoles";


export interface IUser {
	id: number,
	isActive: boolean,
	avatar: string,
	login: string,
	email: string,
	gender: boolean,
	phone: string,
	country: TypeUserCountries,
	role: TypeUserRoles,
	dateOfBirth: string,
	dateOfRegistration: string
}