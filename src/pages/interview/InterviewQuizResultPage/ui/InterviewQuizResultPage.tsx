import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
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
		<Flex gap="20" wrap="wrap" className={styles.container}>
			<QuizQuestionsInfo
				className={styles.questions}
				questions={questions}
				quizNumber={quiz?.quizNumber}
			/>
			<QuizAdditionalInfo className={styles.quiz} quiz={quiz} isLoading={isLoading} />
			<PassedQuestionsList className={styles['questions-list']} questions={questions ?? []} />
		</Flex>
	);
};

export default InterviewQuizResultPage;
