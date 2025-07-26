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

export type SortOrder = 'ASC' | 'DESC';

export interface GetLoginError {
	error: {
		status: number;
		data: {
			message: string;
			statusCode: number;
		};
	};
}

export interface SelectedEntity<Id extends string | number> {
	id: Id;
	title?: string;
	disabled?: boolean;
}
export type SelectedEntities<Id extends string | number> = SelectedEntity<Id>[];

export type SelectedAdminEntity = SelectedEntity<number>;
export type SelectedAdminEntities = SelectedAdminEntity[];

export type Pallete =
	| 'purple-950'
	| 'purple-900'
	| 'purple-800'
	| 'purple-700'
	| 'purple-600'
	| 'purple-500'
	| 'purple-400'
	| 'purple-300'
	| 'purple-200'
	| 'purple-100'
	| 'purple-50'
	| 'red-900'
	| 'red-800'
	| 'red-700'
	| 'red-600'
	| 'red-500'
	| 'red-400'
	| 'red-300'
	| 'red-200'
	| 'red-100'
	| 'red-25'
	| 'yellow-900'
	| 'yellow-800'
	| 'yellow-700'
	| 'yellow-600'
	| 'yellow-500'
	| 'yellow-400'
	| 'yellow-300'
	| 'yellow-200'
	| 'green-900'
	| 'green-800'
	| 'green-750'
	| 'green-700'
	| 'green-600'
	| 'green-500'
	| 'green-400'
	| 'green-300'
	| 'green-200'
	| 'green-100'
	| 'green-007'
	| 'black-1000'
	| 'black-900'
	| 'black-850'
	| 'black-800'
	| 'black-700'
	| 'black-600'
	| 'black-500'
	| 'black-400'
	| 'black-300'
	| 'black-200'
	| 'black-150'
	| 'black-100'
	| 'black-50'
	| 'black-30'
	| 'black-25'
	| 'white-900';
