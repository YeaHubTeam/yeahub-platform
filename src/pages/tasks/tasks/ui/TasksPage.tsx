import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';
import { Text } from '@/shared/ui/Text';

import { TaskCard, useGetTasksListQuery } from '@/entities/task';

import styles from './TasksPage.module.css';

const TasksPage = () => {
	const { t } = useTranslation([i18Namespace.translation]);
	const { data, isLoading } = useGetTasksListQuery({ limit: 10 });

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className={styles.page}>
			<Text variant="head1" className={styles.title}>
				{t(Translation.SIDEBAR_MENU_TASKS_TITLE)}
			</Text>
			<div className={styles.list}>
				{data?.data.map((task) => <TaskCard key={task.id} task={task} />)}
			</div>
		</div>
	);
};

export default TasksPage;
