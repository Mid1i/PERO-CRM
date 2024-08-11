import type { TypeUserCountries } from "@/types/TypeUserCountries";
import type { TypeUserRoles } from "@/types/TypeUserRoles";
import type { IDate } from "@/interfaces/IDate";




export interface IFilters {
	isActive?: boolean,
	countries: TypeUserCountries[],
	roles: TypeUserRoles[],
	dateOfBirth?: IDate,
	dateOfRegistration?: IDate
}