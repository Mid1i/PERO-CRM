import { Ref, ref, UnwrapRef } from "vue";
import { useApiService } from "@/composables/useApiService";


interface IUseApiReturn<T> {
	data: Ref<UnwrapRef<T> | null>,
	isLoading: Ref<boolean>,
	fetchData: (url: string, params?: Record<string, any>) => Promise<void>,
	postData: (url: string, data?: Record<string, any>) => Promise<void>,
	updateData: (url: string, data?: Record<string, any>) => Promise<void>,
	deleteData: (url: string) => Promise<void>
}


export const useApi = <T>(): IUseApiReturn<T> => {
	const data = ref<T | null>(null);
	const isLoading = ref<boolean>(true);

	const { get, post, put, del } = useApiService();

	const fetchData = async (url: string, params: Record<string, any> = {}): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await get<T>(url, params) as UnwrapRef<T>;
			isLoading.value = false;
		} catch (error) {
			handleError(error)
		}
	}

	const postData = async (url: string, data: Record<string, any> = {}): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await post<T>(url, data) as UnwrapRef<T>;
			isLoading.value = false;
		} catch (error) {
			handleError(error)
		}
	}

	const updateData = async (url: string, data: Record<string, any> = {}): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await put<T>(url, data) as UnwrapRef<T>;
			isLoading.value = false;
		} catch (error) {
			handleError(error)
		}
	}

	const deleteData = async (url: string): Promise<void> => {
		isLoading.value = true;
		try {
			data.value = await del<T>(url) as UnwrapRef<T>;
			isLoading.value = false;
		} catch (error) {
			handleError(error)
		}
	}

	const handleError = (error: unknown): void => {
		console.error(`API error: ${error}`);
		throw error;
	}


	return {
		data,
		isLoading,
		fetchData,
		postData,
		updateData,
		deleteData
	}
}