import { Tasks } from '@/shared/config';

export const SORT_ORDER_DATA = [
	{ id: 1, label: Tasks.SORT_ASC, value: 'ASC' },
	{ id: 2, label: Tasks.SORT_DESC, value: 'DESC' },
] as const;

export const SORT_FIELDS_DATA = [
	{ id: 1, label: Tasks.SORT_FIELDS_NAME, value: 'name' },
	{ id: 2, label: Tasks.SORT_DIFFICULTY, value: 'difficulty' },
	{ id: 3, label: Tasks.SORT_CREATED_AT, value: 'createdAt' },
] as const;
