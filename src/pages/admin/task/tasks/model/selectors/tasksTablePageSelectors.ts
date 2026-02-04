import type { State } from '@/shared/config';

export const getSelectedTasks = (state: State) => {
	return state.tasksTablePage.selectedTasks || [];
};
