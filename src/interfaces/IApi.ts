export interface IApi<T> {
	meta: {
		total_items: number,
		total_pages: number,
		per_page: number,
		remaining_count: number
	}, 
	items: T
}