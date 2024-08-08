import { Ref, ComputedRef, ShallowRef, ref, computed, watch, shallowRef } from "vue";
import { getWordByAmount } from "@/helpers/words";
import { debounce } from "@/helpers/debounce";


type TypeUseSearchReturn<T> = {
	searchRequest: Ref<string>,
	results: ShallowRef<T[]>,
	onClearSearch: () => void,
	onHighlightMatches: (text: string) => string,
	generateResultsMessage: ComputedRef<string>
};


export const useSearch = <T extends Record<string, any>>(data: T[], searchFields: (keyof T)[], clearSearch: () => void): TypeUseSearchReturn<T> => {
	const searchRequest = ref<string>("");
	const results = shallowRef<T[]>([]);

	const onClearSearch = (): void => {
		setTimeout(() => (searchRequest.value = ""), 300);
		clearSearch();
	}

	const onSearch = (): void => {
		const request = searchRequest.value.toLowerCase();
		results.value = request ? data.filter(value => searchFields.some(field => value[field].toString().toLowerCase().includes(request))) : [];
	}

	const onHighlightMatches = (text: string): string => {
		const request = searchRequest.value;
		if (!request) return text;

		const regex = new RegExp(`(${request})`, "gi");
		return text.replace(regex, `<span class="highlight">$1</span>`);
	}

	const generateResultsMessage = computed<string>(() => {
		const length = results.value.length;
		return `Найден${length % 10 !== 1 ? 'о' : ''} ${getWordByAmount(length, 'результат', 'результата', 'результатов')}`;
	});

	watch(searchRequest, debounce(<() => T[]>onSearch));


	return {
		searchRequest,
		results,
		onClearSearch,
		onHighlightMatches,
		generateResultsMessage
	}
}