import { useScreenSize } from '@/shared/hooks';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { QuestionAdditionalInfoSkeleton } from '@/widgets/question/QuestionAdditionalInfo';
import { QuestionBodySkeleton } from '@/widgets/question/QuestionBody';
import { QuestionHeaderSkeleton } from '@/widgets/question/QuestionHeader';
import { QuestionNavigationSkeleton } from '@/widgets/question/QuestionNavigation';

import styles from './PublicQuestionPage.module.css';

export const PublicQuestionPageSkeleton = ({ dataTestId }: { dataTestId?: string }) => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex dataTestId={dataTestId} direction="column" align="start">
			<ButtonSkeleton
				width={100}
				size="small"
				variant="link-purple"
				className={styles['back-button']}
			/>
			<Flex gap="20" maxWidth>
				<Flex gap="20" direction="column" flex={1}>
					<QuestionHeaderSkeleton />
					<QuestionNavigationSkeleton />
					<QuestionBodySkeleton />
				</Flex>
				{!isMobile && !isTablet && (
					<Flex direction="column" gap="20" className={styles.additional}>
						<QuestionAdditionalInfoSkeleton />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};
