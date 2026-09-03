import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { SearchInput } from '@/shared/ui/SearchInput';

import { PublicCompanySelect } from '@/entities/company';
import { TaskCategoryFilterList, TasksFilterParams } from '@/entities/task';

import { SortTasksByField } from '../SortTasksByField/SortTasksByField';
import { SortTasksByOrder } from '../SortTasksByOrder/SortTasksByOrder';
import { TaskDifficultyFilter } from '../TaskDifficultyFilter/TaskDifficultyFilter';
import { TaskLanguagesFilter } from '../TaskLanguagesFilter/TaskLanguagesFilter';

interface TasksFiltersProps {
	filters: TasksFilterParams;
	withSorting?: boolean;
	onChangeTitle: (title: TasksFilterParams['title']) => void;
	onChangeDifficulty: (difficulty?: TasksFilterParams['difficulty']) => void;
	onChangeLangIds: (langIds?: TasksFilterParams['langIds']) => void;
	onChangeCategory: (category?: TasksFilterParams['category']) => void;
	onChangeCompanyId: (companyId?: TasksFilterParams['companyId']) => void;
	onChangeSortField?: (sortBy?: TasksFilterParams['sortBy']) => void;
	onChangeSortOrder?: (sortOrder?: TasksFilterParams['sortOrder']) => void;
}

export const TasksFilters = ({
	filters,
	withSorting,
	onChangeTitle,
	onChangeDifficulty,
	onChangeLangIds,
	onChangeCategory,
	onChangeCompanyId,
	onChangeSortField,
	onChangeSortOrder,
}: TasksFiltersProps) => {
	const { title, difficulty, langIds, category, companyId } = filters;
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
			<TaskCategoryFilterList onChooseCategory={onChangeCategory} selectedCategory={category} />
			<PublicCompanySelect value={companyId} onChange={onChangeCompanyId} />
			{withSorting && onChangeSortField && onChangeSortOrder && (
				<>
					<SortTasksByField
						selectedOrderBy={filters.sortBy}
						onChangeSortField={onChangeSortField}
					/>
					<SortTasksByOrder
						selectedOrder={filters.sortOrder}
						onChangeSortOrder={onChangeSortOrder}
					/>
				</>
			)}
		</Flex>
	);
};
