import { Flex } from '@/shared/ui/Flex';

import { TaskCardSkeleton } from '@/entities/task';

export const TasksListSkeleton = () => {
	return (
		<Flex direction="column" gap="20">
			{[...Array(4)].map((_, index) => (
				<TaskCardSkeleton key={index} />
			))}
		</Flex>
	);
};
