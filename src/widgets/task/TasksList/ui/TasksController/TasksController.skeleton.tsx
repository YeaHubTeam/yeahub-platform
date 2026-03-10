import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { WarningPopoverSkeleton } from '@/shared/ui/WarningPopover';

import { TasksListSkeleton } from '../TasksList/TasksList.skeleton';

import styles from './TasksController.module.css';

export const TasksControllerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.task);

	return (
		<Card
			className={styles.wrapper}
			title={t(Tasks.TITLE_SHORT)}
			headerAction={<WarningPopoverSkeleton />}
			withOutsideShadow
		>
			<TasksListSkeleton />
		</Card>
	);
};
