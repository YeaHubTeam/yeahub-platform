import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { TaskCategoryFilterListSkeleton } from '@/entities/task';

import { TaskDifficultyFilterSkeleton } from '../TaskDifficultyFilter/TaskDifficultyFilter.skeleton';
import { TaskLanguagesFilterSkeleton } from '../TaskLanguagesFilter/TaskLanguagesFilter.skeleton';

export const TasksFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<TaskDifficultyFilterSkeleton />
			<TaskLanguagesFilterSkeleton />
			<TaskCategoryFilterListSkeleton />
		</Flex>
	);
};
