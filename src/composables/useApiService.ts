import axios, { AxiosInstance, AxiosResponse } from "axios";


interface IApiServiceReturn {
	get: <T>(url: string, params?: Record<string, any>) => Promise<T>,
	post: <T>(url: string, data?: Record<string, any>) => Promise<T>,
	put: <T>(url: string, data?: Record<string, any>) => Promise<T>,
	del: <T>(url: string) => Promise<T>
}


const apiService: AxiosInstance = axios.create({
	baseURL: "https://efa01a8820d3e67e.mokky.dev",
	timeout: 3000,
	headers: {
		"Content-Type": "application/json"
	}
});


export const useApiService = (): IApiServiceReturn => {

	const get = async <T>(url: string, params: Record<string, any> = {}): Promise<T> => {
		const response: AxiosResponse<T> = await apiService.get(url, { params });
		return response.data;
	}

	const post = async <T>(url: string, data: Record<string, any> = {}): Promise<T> => {
		const response: AxiosResponse<T> = await apiService.post(url, data);
		return response.data;
	}

	const put = async <T>(url: string, data: Record<string, any> = {}): Promise<T> => {
		const response: AxiosResponse<T> = await apiService.put(url, data);
		return response.data;
	}

	const del = async <T>(url: string): Promise<T> => {
		const response: AxiosResponse<T> = await apiService.delete(url);
		return response.data;
	}


	return {
		get, 
		post,
		put,
		del
	}
}