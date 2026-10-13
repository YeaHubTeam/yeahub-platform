import { SortOrder } from '@/shared/libs';

import type { TaskCategoryCode, TaskDifficulty, TaskFilterOrderBy } from './task';

export interface TasksFilterParams {
	page?: number;
	title?: string;
	difficulty?: TaskDifficulty;
	category?: TaskCategoryCode;
	langIds?: number[];
	companyId?: string;
	sortBy?: TaskFilterOrderBy;
	sortOrder?: SortOrder;
}
