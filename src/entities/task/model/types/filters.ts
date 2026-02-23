import type { TaskCategoryCode, TaskDifficulty } from './task';

export interface TasksFilterParams {
	page?: number;
	title?: string;
	difficulty?: TaskDifficulty;
	category?: TaskCategoryCode;
	langIds?: number[];
}
