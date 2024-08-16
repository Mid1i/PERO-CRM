import type { TypeUserCountries } from "@/types/TypeUserCountries";
import type { TypeUserRoles } from "@/types/TypeUserRoles";
import type { IDate } from "@/interfaces/IDate";




export interface IFilters {
	isActive?: boolean,
	country: TypeUserCountries[],
	role: TypeUserRoles[],
	dateOfBirth?: IDate,
	dateOfRegistration?: IDate
}