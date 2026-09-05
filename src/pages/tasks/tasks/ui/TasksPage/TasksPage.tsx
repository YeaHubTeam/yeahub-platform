import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';

import { useGetTasksListQuery } from '@/entities/task';

import { TasksFilters, useTasksFilters } from '@/features/task/filterTasks';

import { ListLayoutPage } from '@/widgets/ListLayoutPage';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { TasksList } from '@/widgets/task/TasksList';

import { TasksPageSkeleton } from './TasksPage.skeleton';

const TasksPage = () => {
	const { t } = useTranslation(i18Namespace.task);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onChangeDifficulty,
		onChangeLangIds,
		onChangeCategory,
		onChangeCompanyId,
		onResetFilters,
	} = useTasksFilters({
		page: 1,
	});

	const { data, isLoading, isError, refetch } = useGetTasksListQuery({
		limit: 10,
		page: filters.page,
		title: filters.title,
		difficulty: filters.difficulty,
		langIds: filters.langIds,
		category: filters.category,
		companyId: filters.companyId,
		canSolve: filters.title ? true : undefined,
	});

	const tasksList = data?.data || [];

	const renderFilters = () => (
		<TasksFilters
			onChangeTitle={onChangeTitle}
			onChangeDifficulty={onChangeDifficulty}
			onChangeLangIds={onChangeLangIds}
			onChangeCategory={onChangeCategory}
			onChangeCompanyId={onChangeCompanyId}
			filters={{
				title: filters.title,
				difficulty: filters.difficulty,
				langIds: filters.langIds,
				category: filters.category,
				companyId: filters.companyId,
			}}
		/>
	);

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Tasks.STUB_EMPTY_TASKS_PUBLIC_TITLE),
			subtitle: t(Tasks.STUB_EMPTY_TASKS_PUBLIC_SUBTITLE),
		},
		'filter-empty': {
			subtitle: t(Tasks.STUB_EMPTY_TASKS_PUBLIC_FILTERS_SUBTITLE),
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	const content = <TasksList tasks={tasksList} />;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			skeleton={<TasksPageSkeleton />}
			hasData={tasksList.length > 0}
			hasFilters={hasFilters}
			stubs={stubs}
			content={content}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: data?.limit || 0,
				total: data?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<ListLayoutPage
					title={t(Tasks.TITLE_SHORT)}
					filters={renderFilters()}
					pagination={pagination}
				>
					{content}
				</ListLayoutPage>
			)}
		</PageWrapper>
	);
};

export default TasksPage;
