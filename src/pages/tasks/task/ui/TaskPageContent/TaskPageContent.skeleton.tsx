import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { TaskEditorSkeleton } from '@/widgets/task/TaskEditor';
import { TaskTabsSkeleton } from '@/widgets/task/TaskTabs';

import styles from './TaskPageContent.module.css';

export const TaskPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Card withOutsideShadow className={styles.page} classNameContent={styles['content-wrapper']}>
			<Flex gap="20" direction={isMobile || isTablet ? 'column' : 'row'} className={styles.content}>
				<TaskTabsSkeleton />
				<TaskEditorSkeleton />
			</Flex>
		</Card>
	);
};
