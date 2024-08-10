import { inject } from "vue";
import type { TypeUserFilters } from "@/types/TypeUserFilters";


type TypeIsActiveFunction = <K extends keyof TypeUserFilters>(element: TypeUserFilters[K], id: K) => boolean;
type TypeUpdateFunction = <K extends keyof TypeUserFilters>(element: TypeUserFilters[K], id: K) => void;


export const useFilters = (): { isFilterActive: TypeIsActiveFunction, updateFilters: TypeUpdateFunction } => {
	const isFilterActive = inject<TypeIsActiveFunction>("isFilterActive");
	const updateFilters = inject<TypeUpdateFunction>("updateFilters");

	if (!isFilterActive || !updateFilters) {
		throw new Error("Filter functions is not provided");
	}

	return { isFilterActive, updateFilters };
}