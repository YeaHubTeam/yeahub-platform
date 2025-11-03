import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { CloneQuizButton } from '@/features/quiz/cloneQuiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import styles from './InterviewQuizResultPage.module.css';

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
