import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { ProgressBlockSkeleton } from '@/widgets/question/ProgressBlock';
import { QuestionActionsSkeleton } from '@/widgets/question/QuestionActions';
import { QuestionAdditionalInfoSkeleton } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBodySkeleton } from '@/widgets/question/QuestionBody';
import { QuestionHeaderSkeleton } from '@/widgets/question/QuestionHeader';

import styles from './QuestionPage.module.css';

export const QuestionPageSkeleton = () => {
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
