import type { IDate } from "@/interfaces/IDate";
import { IUser } from "@/interfaces/IUser";




export interface IFilters {
	isActive?: IUser["isActive"],
	country: IUser["country"][],
	role: IUser["role"][],
	dateOfBirth?: IDate,
	dateOfRegistration?: IDate
}