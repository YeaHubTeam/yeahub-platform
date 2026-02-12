import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { TasksFilterParams } from '@/entities/task';

import { TaskDifficultyFilter } from '../TaskDifficultyFilter/TaskDifficultyFilter';
import { TaskLanguagesFilter } from '../TaskLanguagesFilter/TaskLanguagesFilter';

interface TasksFiltersProps {
	filters: TasksFilterParams;
	onChangeTitle: (title: TasksFilterParams['title']) => void;
	onChangeDifficulty: (difficulty?: TasksFilterParams['difficulty']) => void;
	onChangeLangIds: (langIds?: TasksFilterParams['langIds']) => void;
}

export const TasksFilters = ({
	filters,
	onChangeTitle,
	onChangeDifficulty,
	onChangeLangIds,
}: TasksFiltersProps) => {
	const { title, difficulty, langIds } = filters;
	const { t } = useTranslation(i18Namespace.task);

	return (
		<Flex direction="column" gap="24">
			<SearchInput
				placeholder={t(Tasks.SEARCH_PLACEHOLDER)}
				onSearch={onChangeTitle}
				currentValue={title}
			/>

			<TaskDifficultyFilter
				selectedDifficulty={difficulty}
				onChangeDifficulty={onChangeDifficulty}
			/>

			<TaskLanguagesFilter selectedLangIds={langIds} onChangeLangIds={onChangeLangIds} />
		</Flex>
	);
};
