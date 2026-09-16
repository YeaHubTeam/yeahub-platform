import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { HeaderAdminPageDetailCardSkeleton } from '@/shared/ui/HeaderAdminPageDetailCard';

import { TaskAdditionalInfoSkeleton } from '../TaskAdditionalInfo/TaskAdditionalInfo.skeleton';
import { TaskBodySkeleton } from '../TaskBody/TaskBody.skeleton';
import { TaskHeaderSkeleton } from '../TaskHeader/TaskHeader.skeleton';

import styles from './TaskPageContent.module.css';

export const TaskPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<HeaderAdminPageDetailCardSkeleton />
			<Flex gap="20" align="start">
				<CardSkeleton className={styles.main} withOutsideShadow>
					<Flex direction="column" gap="20" maxWidth>
						<TaskHeaderSkeleton />
						<TaskBodySkeleton />
					</Flex>
				</CardSkeleton>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20">
						<TaskAdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</>
	);
};
