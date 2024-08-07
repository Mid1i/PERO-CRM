import type { TypeUserCountries } from "@/types/TypeUserCountries";
import type { TypeUserRoles } from "@/types/TypeUserRoles";
import type { TypeActivity } from "@/types/TypeActivity";
import type { IDate } from "@/interfaces/IDate";


export type TypeUserFilters = "isActive" | "roles" | "countries";

export type TypeUserFiltersDates = "dateOfBirth" | "dateOfRegistration"

export type TypeUserFiltersValues = TypeUserCountries | TypeUserRoles | TypeActivity | IDate;