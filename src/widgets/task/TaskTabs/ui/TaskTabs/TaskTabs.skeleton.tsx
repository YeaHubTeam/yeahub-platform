import { Card } from '@/shared/ui/Card';
import { TabsSkeleton } from '@/shared/ui/Tabs';

import { TaskDescriptionSkeleton } from '../tabs/TaskDescription/TaskDescription.skeleton';

import styles from './TaskTabs.module.css';

const TabsCount = 4;

export const TaskTabsSkeleton = () => {
	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<TabsSkeleton tabs={new Array(TabsCount).fill(null).map((_, i) => i.toString())} />

			<div className={styles.content}>
				<TaskDescriptionSkeleton />
			</div>
		</Card>
	);
};
