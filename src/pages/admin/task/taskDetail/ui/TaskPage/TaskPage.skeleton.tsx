import { useScreenSize } from '@/shared/libs';
import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { DeleteQuestionButtonSkeleton } from '@/features/question/deleteQuestion';

import { TaskAdditionalInfoSkeleton } from '../TaskAdditionalInfo/TaskAdditionalInfo.skeleton';
import { TaskPageContentSkeleton } from '../TaskPageContent/TaskPageContent.skeleton';

export const TaskPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<>
			<BackHeaderSkeleton>
				<DeleteQuestionButtonSkeleton isDetailPage />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<Flex gap="20" flex={1}>
				<Flex gap="20" direction="column" flex={1}>
					<TaskPageContentSkeleton />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20">
						<TaskAdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</>
	);
};
