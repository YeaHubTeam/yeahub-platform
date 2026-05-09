import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import { TasksFiltersSkeleton } from '@/features/task/filterTasks';

import { TasksListSkeleton } from '@/widgets/task/TasksList';

import styles from './TasksPage.module.css';

export const TasksPageSkeleton = () => {
	const { isMobile, isMobileS, isTablet } = useScreenSize();

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<div className={styles['tasks-list-header']}>
					<TextSkeleton variant={isMobileS ? 'body5-accent' : 'body6'} width={165} />
					{(isMobile || isTablet) && <IconSkeleton size={40} />}
				</div>
				<hr className={styles.divider} />
				<TasksListSkeleton />
			</Card>
			<Card className={styles.filters}>
				<TasksFiltersSkeleton />
			</Card>
		</Flex>
	);
};
