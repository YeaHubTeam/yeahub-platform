import { SelectedAdminEntities } from '@/shared/libs';

export interface TasksTablePageState {
	page: number;
	selectedTasks?: SelectedAdminEntities<string>;
	search?: string;
}
