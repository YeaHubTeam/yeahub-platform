import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { JoinToCommunity } from '@/widgets/Landing/JoinToCommunity';
import { SubscribeToMedia } from '@/widgets/Main/SubscribeToMedia';

import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage/ui/PublicQuizResultPage.skeleton';

import { usePublicQuizResultData } from '../model/hooks/usePublicQuizResultData';

import styles from './PublicQuizResultPage.module.css';

const PublicQuizResultPage = () => {
	const { quizAnswers, isLoading } = usePublicQuizResultData();
	const { isMobile, isTablet } = useScreenSize();

	if (isLoading) return <PublicQuizResultPageSkeleton />;

	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex gap="20" className={styles.wrapper} direction={isTablet || isMobile ? 'column' : 'row'}>
				<JoinToCommunity />
				<SubscribeToMedia />
			</Flex>
			<PassedQuestionsList className={styles['questions-list']} questions={quizAnswers || []} />
		</Flex>
	);
};

export default PublicQuizResultPage;
