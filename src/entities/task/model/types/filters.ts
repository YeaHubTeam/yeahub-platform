import type { TaskDifficulty } from './task';

export interface TasksFilterParams {
	page?: number;
	title?: string;
	difficulty?: TaskDifficulty;
	langIds?: number[];
}
