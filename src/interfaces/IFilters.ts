import type { TypeUserCountries } from "@/types/TypeUserCountries";
import type { TypeUserRoles } from "@/types/TypeUserRoles";
import type { TypeActivity } from "@/types/TypeActivity";
import type { IDate } from "@/interfaces/IDate";




export interface IFilters {
	isActive: TypeActivity | null,
	countries: TypeUserCountries[],
	roles: TypeUserRoles[],
	dateOfBirth: IDate,
	dateOfRegistration: IDate
}