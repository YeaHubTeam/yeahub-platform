import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { PassedQuestionsListSkeleton } from '@/widgets/interview/PassedQuestionsList';
import { JoinToCommunitySkeleton } from '@/widgets/Landing/JoinToCommunity';
import { SubscribeToMediaSkeleton } from '@/widgets/Main/SubscribeToMedia';

import styles from './PublicQuizResultPage.module.css';

export const PublicQuizResultPageSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();

	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex gap="20" className={styles.wrapper} direction={isTablet || isMobile ? 'column' : 'row'}>
				<JoinToCommunitySkeleton />
				<SubscribeToMediaSkeleton />
			</Flex>
			<PassedQuestionsListSkeleton className={styles['questions-list']} questions={[]} />
		</Flex>
	);
};
