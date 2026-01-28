import { Flex } from '@/shared/ui/Flex';

import type { TaskListItem } from '@/entities/task';
import { TaskCard } from '@/entities/task';

interface TasksListProps {
	tasks: TaskListItem[];
}

export const TasksList = ({ tasks }: TasksListProps) => {
	return (
		<Flex direction="column" gap="20">
			{tasks.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</Flex>
	);
};
