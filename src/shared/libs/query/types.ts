export interface Response<T> {
	data: T;
	limit: number;
	total: number;
	page: number;
}
