import { TasksFiltersSkeleton } from '@/features/task/filterTasks';

import { ListLayoutPageSkeleton } from '@/widgets/ListLayoutPage';
import { TasksListSkeleton } from '@/widgets/task/TasksList';

export const TasksPageSkeleton = () => {
	return (
		<ListLayoutPageSkeleton
			filters={<TasksFiltersSkeleton />}
			list={<TasksListSkeleton />}
			widthText={165}
		/>
	);
};
