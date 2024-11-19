export type TNullable<T> = T | null;

/**
 *
 * @template T - Тип данных в ответе.
 * @property {T} data - Данные, возвращаемые в ответе.
 * @property {number} limit - Лимит количества элементов в ответе.
 * @property {number} total - Общее количество элементов.
 * @property {number} page - Номер текущей страницы.
 */
export interface Response<T> {
	data: T;
	limit: number;
	total: number;
	page: number;
}

export interface GetLoginError {
	error: {
		status: number;
		data: {
			message: string;
			statusCode: number;
		};
	};
}

export interface SelectedAdminEntity {
	id: number;
	title: string;
}

export type SelectedAdminEntities = SelectedAdminEntity[];
