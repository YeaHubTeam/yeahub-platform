import { Task } from '@/entities/task';

export type TaskTabId = 'description' | 'solutions';

export type TaskTabsProps = {
	task: Task;
	solutions?: string[];
};
