import { useEffect, useState } from 'react';

import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';

import { Answers, LS_ACTIVE_MOCK_QUIZ_KEY } from '@/entities/quiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { JoinToCommunity } from '@/widgets/Landing/JoinToCommunity';
import { SubscribeToMedia } from '@/widgets/Main/SubscribeToMedia';

import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage/ui/PublicQuizResultPage.skeleton';

import styles from './PublicQuizResultPage.module.css';

const PublicQuizResultPage = () => {
	const [questions, setQuestions] = useState<Answers[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { isMobile, isTablet } = useScreenSize();

	useEffect(() => {
		const data = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
		setQuestions(data);
		const timer = setTimeout(() => setIsLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	if (isLoading) return <PublicQuizResultPageSkeleton />;

	return (
		<Flex gap="20" direction="column" className={styles.container}>
			<Flex gap="20" className={styles.wrapper} direction={isTablet || isMobile ? 'column' : 'row'}>
				<JoinToCommunity />
				<SubscribeToMedia />
			</Flex>
			<PassedQuestionsList
				className={styles['questions-list']}
				questions={questions || []}
				hideCloneButton={true}
			/>
		</Flex>
	);
};

export default PublicQuizResultPage;
