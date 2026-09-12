import { CardSkeleton } from '@/shared/ui/Card';
import { WarningPopoverSkeleton } from '@/shared/ui/WarningPopover';

import { TasksListSkeleton } from '../TasksList/TasksList.skeleton';

import styles from './TasksController.module.css';

export const TasksControllerSkeleton = () => {
	return (
		<CardSkeleton
			className={styles.wrapper}
			title="title"
			headerAction={<WarningPopoverSkeleton />}
			withOutsideShadow
		>
			<TasksListSkeleton />
		</CardSkeleton>
	);
};
