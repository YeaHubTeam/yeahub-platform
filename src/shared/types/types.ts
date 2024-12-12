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

export type SelectedAdminEntity = SelectedEntity<number>;

export interface SelectedEntity<Id extends string | number> {
	id: Id;
	title?: string;
}

export type SelectedAdminEntities = SelectedAdminEntity[];
export type SelectedEntities<Id extends string | number> = SelectedEntity<Id>[];
