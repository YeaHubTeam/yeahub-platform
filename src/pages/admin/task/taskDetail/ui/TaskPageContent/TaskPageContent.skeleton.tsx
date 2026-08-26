import { useScreenSize } from '@/shared/libs';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { DeleteTaskButtonSkeleton } from '@/features/task/deleteTask';

import { TaskAdditionalInfoSkeleton } from '../TaskAdditionalInfo/TaskAdditionalInfo.skeleton';
import { TaskBodySkeleton } from '../TaskBody/TaskBody.skeleton';
import { TaskHeaderSkeleton } from '../TaskHeader/TaskHeader.skeleton';

import styles from './TaskPageContent.module.css';

export const TaskPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeaderSkeleton>
				<DeleteTaskButtonSkeleton />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
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
