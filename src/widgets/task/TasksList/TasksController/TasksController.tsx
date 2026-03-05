/* eslint-disable prettier/prettier */
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { SimpleStub } from '@/shared/ui/SimpleStub';

import { Task, TaskWarningInfo } from '@/entities/task';

import { TasksList } from '@/widgets/task/TasksList';

import styles from './TasksController.module.css';

interface TasksControllerProps extends Pick<Task, 'isFree'> {
	tasks: Task[];
	isAdmin?: boolean;
	hasPremiumAccess?: boolean;
}

export const TasksController = ({
	tasks,
	isFree,
	isAdmin = false,
	hasPremiumAccess,
}: TasksControllerProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const taskCanSolve = tasks.map((item) => ({ ...item, canSolve: true }));

	if (!isFree && !hasPremiumAccess && !isAdmin) {
		return (
			<Card
				className={styles.wrapper}
				title={t(Tasks.TITLE_SHORT)}
				actionRoute={SELECT_TARIFF_SETTINGS_TAB}
				actionTitle={t(Tasks.COMMUNITY_JOIN)}
				withOutsideShadow
			>
				<SimpleStub variant="no-access" text={t(Tasks.PREVIEW_LOCKED_COLLECTION)} />
			</Card>
		);
	}

	return (
		<Card
			className={styles.wrapper}
			title={t(Tasks.TITLE_SHORT)}
			headerAction={<TaskWarningInfo />}
			withOutsideShadow
		>
			<TasksList tasks={taskCanSolve} />
		</Card>
	);
};
