import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { TaskBodySkeleton } from '../TaskBody/TaskBody.skeleton';
import { TaskHeaderSkeleton } from '../TaskHeader/TaskHeader.skeleton';
export const TaskPageContentSkeleton = () => {
	return (
		<CardSkeleton>
			<Flex direction="column" gap="20" maxWidth>
				<TaskHeaderSkeleton />
				<TaskBodySkeleton />
			</Flex>
		</CardSkeleton>
	);
};
