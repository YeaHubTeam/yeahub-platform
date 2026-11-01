import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { useGetTasksListQuery } from '../../api/taskApi';
import { TaskData } from '../../model/types/task';

import styles from './TasksSearchList.module.css';

const COLLECTION_TASKS_LIMIT = 10;

interface TasksSearchListProps {
	selectedTasks: { id: string | number; title: string }[];
	handleSelectTask: (task: TaskData) => void;
	handleUnselectTask: (id: string) => void;
}

export const TasksSearchList = ({
	selectedTasks,
	handleSelectTask,
	handleUnselectTask,
}: TasksSearchListProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const [taskSearch, setTaskSearch] = useState('');
	const [page, setPage] = useState(1);

	const {
		data: tasksResponse,
		isLoading,
		isError,
	} = useGetTasksListQuery({
		title: taskSearch,
		limit: COLLECTION_TASKS_LIMIT,
		page: page,
	});

	const handleTaskSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskSearch(e.target.value);
	};

	const handleTaskClick = (task: { title: string; id: string }, isActive: boolean) => {
		if (isActive) {
			handleUnselectTask(task.id);
		} else {
			handleSelectTask(task);
		}
	};

	const filteredTasks = tasksResponse?.data || [];
	const totalTasks = tasksResponse?.total || 0;

	return (
		<Flex direction="column" gap="24" className={styles['drawer-content']}>
			<Input
				onChange={handleTaskSearch}
				className={styles.input}
				prefix={<Icon icon="search" size={20} color="black-300" />}
				placeholder={t(Translation.SEARCH)}
			/>

			<Flex direction="column" gap="16">
				{isLoading && <Text variant="body2">{t('loading', 'Загрузка задач...')}</Text>}

				{isError && (
					<Text variant="body2" className={styles.errorText}>
						{t('error', 'Произошла ошибка при загрузке задач.')}
					</Text>
				)}

				{!isLoading && !isError && filteredTasks.length === 0 && (
					<Text variant="body2">{t('no_data', 'Задачи не найдены.')}</Text>
				)}

				{!isLoading &&
					!isError &&
					filteredTasks.map((task) => {
						const taskName = task.name || '';
						const isActive = selectedTasks.some((selected) => selected.id === task.id);
						return (
							<button
								key={task.id}
								onClick={() => handleTaskClick({ title: taskName, id: task.id }, isActive)}
								className={styles['task-button']}
							>
								<Card
									withOutsideShadow
									className={classNames(
										styles['task-card'],
										isActive && styles['task-card-active'],
									)}
								>
									{taskName}
								</Card>
							</button>
						);
					})}
			</Flex>

			<TablePagination
				page={page}
				total={totalTasks}
				limit={COLLECTION_TASKS_LIMIT}
				onChangePage={setPage}
			/>
		</Flex>
	);
};
