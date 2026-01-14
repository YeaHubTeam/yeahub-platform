import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { ProgressBlockSkeleton, QuestionAdditionalInfoSkeleton } from '@/entities/question';

import { QuestionBodySkeleton } from '@/widgets/question/QuestionBody';
import { QuestionHeaderSkeleton } from '@/widgets/question/QuestionHeader';

import { QuestionActionsSkeleton } from '../QuestionActions/QuestionActions.skeleton';

import styles from './QuestionPageContent.module.css';

export const QuestionPageContentSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20">
			<Flex gap="20" direction="column" flex={1}>
				<QuestionHeaderSkeleton />
				<QuestionActionsSkeleton />
				<QuestionBodySkeleton />
			</Flex>
			{!isMobile && !isTablet && (
				<Flex direction="column" gap="20" className={styles.additional}>
					<ProgressBlockSkeleton />
					<QuestionAdditionalInfoSkeleton />
				</Flex>
			)}
		</Flex>
	);
};
