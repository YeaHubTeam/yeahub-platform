import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { CardSkeleton } from '@/shared/ui/Card';
import { WarningPopoverSkeleton } from '@/shared/ui/WarningPopover';

import { TasksListSkeleton } from '../TasksList/TasksList.skeleton';

import styles from './TasksController.module.css';

export const TasksControllerSkeleton = () => {
	const { t } = useTranslation(i18Namespace.task);

	return (
		<CardSkeleton
			className={styles.wrapper}
			title={t(Tasks.TITLE_LIST)}
			headerAction={<WarningPopoverSkeleton />}
			withOutsideShadow
		>
			<TasksListSkeleton />
		</CardSkeleton>
	);
};
