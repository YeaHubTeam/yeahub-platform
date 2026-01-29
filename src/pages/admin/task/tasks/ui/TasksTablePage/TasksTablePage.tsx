import { useTranslation } from 'react-i18next';

import { i18Namespace, Task } from '@/shared/config';
import { type SelectedAdminEntities, useAppDispatch, useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetTasksListQuery } from '@/entities/task';

import { TasksFilters, useTasksFilters } from '@/features/task/filterTasks';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedTasks } from '../../model/selectors/tasksTablePageSelectors';
import { tasksTablePageActions } from '../../model/slices/tasksTablePageSlice';
import { TasksTable } from '../TasksTable/TasksTable';

import styles from './TasksTablePage.module.css';

const TasksTablePage = () => {
	const { t } = useTranslation(i18Namespace.task);
	const dispatch = useAppDispatch();
	const selectedTasks = useAppSelector(getSelectedTasks);

	const {
		filters,
		hasFilters,
		onResetFilters,
		onChangePage,
		onChangeTitle,
		onChangeDifficulty,
		onChangeLangIds,
	} = useTasksFilters({ page: 1 });

	const {
		data: allTasks,
		isLoading: isLoadingAllTasks,
		isError: isErrorAllTasks,
		refetch: refetchAllTasks,
	} = useGetTasksListQuery({
		page: filters.page,
		title: filters.title,
		difficulty: filters.difficulty,
		langIds: filters.langIds,
	});

	const onSelectTasks = (ids: SelectedAdminEntities<string>) => {
		dispatch(tasksTablePageActions.setSelectedTasks(ids));
	};

	const resetAll = () => {
		dispatch(tasksTablePageActions.resetFilters());
		onResetFilters();
	};

	const tasksList = allTasks?.data ?? [];

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Task.STUB_EMPTY_TASKS_ADMIN_TITLE),
			subtitle: t(Task.STUB_EMPTY_TASKS_ADMIN_SUBTITLE),
			buttonText: t(Task.STUB_EMPTY_TASKS_ADMIN_SUBMIT),
		},
		error: {
			onClick: refetchAllTasks,
		},
		'filter-empty': {
			onClick: resetAll,
		},
	};

	const content = (
		<TasksTable tasks={tasksList} selectedTasks={selectedTasks} onSelectTasks={onSelectTasks} />
	);

	return (
		<PageWrapper
			isLoading={isLoadingAllTasks}
			hasError={isErrorAllTasks}
			hasFilters={hasFilters}
			hasData={tasksList.length > 0}
			stubs={stubs}
			content={content}
			roles={['admin', 'author']}
			paginationOptions={{
				page: filters.page ?? 1,
				onChangePage,
				limit: allTasks?.limit ?? 0,
				total: allTasks?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						onSearch={onChangeTitle}
						searchValue={filters.title}
						hasFilters={hasFilters}
						renderFilter={() => (
							<TasksFilters
								filters={filters}
								onChangeTitle={onChangeTitle}
								onChangeDifficulty={onChangeDifficulty}
								onChangeLangIds={onChangeLangIds}
							/>
						)}
					/>
					<Card className={styles.content}>
						<>
							{content}
							{pagination}
						</>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TasksTablePage;
