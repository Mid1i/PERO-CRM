import { Ref, UnwrapRef, ComputedRef, ref, computed, watch } from "vue";
import { getWordByAmount } from "@/helpers/words";
import { useApi } from "@/composables/useApi";
import { debounce } from "@/helpers/debounce";


type TypeUseSearchReturn<T> = {
	searchRequest: Ref<string>,
	results: Ref<UnwrapRef<T[]> | null>,
	clearSearch: () => void,
	highlightMatches: (text: string) => string,
	generateResultsMessage: ComputedRef<string>
};


export const useSearch = <T>(url: string, searchField: keyof T, clearFunction: () => void): TypeUseSearchReturn<T> => {
	const searchRequest = ref<string>("");

	const { data: results, fetchData } = useApi<T[]>();


	const clearSearch = (): void => {
		setTimeout(() => (searchRequest.value = ""), 300);
		clearFunction();
	}

	const search = (): void => {
		const request = searchRequest.value.toLowerCase();
		request ? fetchData(url, { [searchField]: `*${request}` }) : results.value = null;
	}

	const highlightMatches = (text: string): string => {
		const request = searchRequest.value;
		if (!request) return text;

		const regex = new RegExp(`(${request})`, "gi");
		return text.replace(regex, `<span class="highlight">$1</span>`);
	}

	const generateResultsMessage = computed<string>(() => {
		const length = results.value?.length;
		return length ? `Найден${length % 10 !== 1 ? 'о' : ''} ${getWordByAmount(length, 'результат', 'результата', 'результатов')}` : "";
	});

	watch(searchRequest, debounce(<() => T[]>search));


	return {
		searchRequest,
		results,
		clearSearch,
		highlightMatches,
		generateResultsMessage
	}
}