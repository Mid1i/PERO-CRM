import type { IFilters } from "@/interfaces/IFilters";


export const formParams = (value: any[], id: keyof IFilters): URLSearchParams => {
	const params = new URLSearchParams();

	value.forEach(item => params.append(`${id}[]`, item));
	
	return params;
}