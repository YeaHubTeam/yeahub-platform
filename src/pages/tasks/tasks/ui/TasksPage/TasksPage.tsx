import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetTasksListQuery } from '@/entities/task';

import { TasksFilters, useTasksFilters } from '@/features/task/filterTasks';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { TasksList } from '@/widgets/task/TasksList';

import styles from './TasksPage.module.css';

const TasksPage = () => {
	const { isMobile, isMobileS, isTablet } = useScreenSize();
	const { t } = useTranslation(i18Namespace.task);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onChangeDifficulty,
		onChangeLangIds,
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
	});

	const tasksList = data?.data || [];

	const renderFilters = () => (
		<TasksFilters
			onChangeTitle={onChangeTitle}
			onChangeDifficulty={onChangeDifficulty}
			onChangeLangIds={onChangeLangIds}
			filters={{
				title: filters.title,
				difficulty: filters.difficulty,
				langIds: filters.langIds,
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
				<Flex gap="20" align="start">
					<Card className={styles.main}>
						<div className={styles['tasks-list-header']}>
							<Text variant={isMobileS ? 'body5-accent' : 'body6'} isMainTitle maxRows={1}>
								{t(Tasks.TITLE_SHORT)}
							</Text>
							{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						</div>
						<hr className={styles.divider} />
						<>
							{content}
							{pagination}
						</>
					</Card>
					<Card className={styles.filters}>{renderFilters()}</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default TasksPage;
