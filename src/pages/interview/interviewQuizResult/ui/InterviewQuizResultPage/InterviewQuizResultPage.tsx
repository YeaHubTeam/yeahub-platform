import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { CloneQuizButton } from '../CloneQuizButton/CloneQuizButton';
import { QuizAdditionalInfo } from '../QuizAdditionalInfo/QuizAdditionalInfo';

import styles from './InterviewQuizResultPage.module.css';
import { InterviewQuizResultPageSkeleton } from './InterviewQuizResultPage.skeleton';

const InterviewQuizResultPage = () => {
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const profileId = useAppSelector(getProfileId);
	const { quizId } = useParams<{ quizId?: string }>();

	const { data: quiz, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId,
	});

	if (isLoading) {
		return <InterviewQuizResultPageSkeleton />;
	}

	const questions = quiz?.response.answers;

	return (
		<>
			<Flex gap="20" wrap="wrap" className={styles.container} justify="end">
				<QuizQuestionsInfo
					className={styles.questions}
					questions={questions}
					quizNumber={quiz?.quizNumber}
				/>
				<QuizAdditionalInfo className={styles.quiz} quiz={quiz} isLoading={isLoading} />
				<PassedQuestionsList className={styles['questions-list']} questions={questions ?? []} />
				{hasPremium && <CloneQuizButton />}
			</Flex>
		</>
	);
};

export default InterviewQuizResultPage;
