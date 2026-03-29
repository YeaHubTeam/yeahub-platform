import { ChangeEvent, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

import { useGetTasksListQuery } from '../../api/taskApi';

import styles from './ChooseTasksDrawer.module.css';

interface TasksSearchListProps {
	selectedTasks: { id: string | number; title: string }[];
	onSelectTask: (task: { id: string | number; title: string }) => void;
}

export const TasksSearchList = ({ selectedTasks, onSelectTask }: TasksSearchListProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const [taskSearch, setTaskSearch] = useState('');
	const {
		data: tasksResponse,
		isLoading,
		isError,
	} = useGetTasksListQuery({
		title: taskSearch,
		limit: 20,
	});

	const handleTaskSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskSearch(e.target.value);
	};

	const filteredTasks = useMemo(() => {
		if (!tasksResponse?.data) return [];
		return tasksResponse.data.filter((task) => {
			const taskName = task.name || '';
			const isAlreadySelected = selectedTasks.some(
				(selected) => String(selected.id) === String(task.id),
			);
			return !isAlreadySelected && taskName.toLowerCase().includes(taskSearch.toLowerCase());
		});
	}, [tasksResponse?.data, selectedTasks, taskSearch]);

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
						return (
							<button
								key={task.id}
								onClick={() => onSelectTask({ title: taskName, id: task.id })}
								className={styles['question-button']}
							>
								<Card withOutsideShadow className={styles['question-card']}>
									{taskName}
								</Card>
							</button>
						);
					})}
			</Flex>
		</Flex>
	);
};
