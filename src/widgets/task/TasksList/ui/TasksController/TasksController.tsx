import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { SimpleStub } from '@/shared/ui/SimpleStub';
import { WarningPopover } from '@/shared/ui/WarningPopover';

import { Task } from '@/entities/task';

import { TasksList } from '../TasksList/TasksList';

import styles from './TasksController.module.css';

interface TasksControllerProps {
	tasks: Task[];
	isFree: boolean;
	isAdmin?: boolean;
	hasPremiumAccess?: boolean;
}

export const TasksController = ({
	isFree,
	tasks,
	isAdmin = false,
	hasPremiumAccess,
}: TasksControllerProps) => {
	const { t } = useTranslation(i18Namespace.task);

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
			title={t(Tasks.TITLE_LIST)}
			headerAction={<WarningPopover text={t(Tasks.WARNING_INTRO)} />}
			withOutsideShadow
		>
			<TasksList tasks={tasks} />
		</Card>
	);
};
