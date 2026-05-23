import { SortOrder } from '@/shared/libs';
import type { TaskCategoryCode, TaskDifficulty } from './task';
import { SortBy } from '@/shared/libs/app/types';

export interface TasksFilterParams {
	page?: number;
	title?: string;
	difficulty?: TaskDifficulty;
	category?: TaskCategoryCode;
	langIds?: number[];
	companyId?: string;
	sortBy?: SortBy;
	sortOrder?: SortOrder;
}
