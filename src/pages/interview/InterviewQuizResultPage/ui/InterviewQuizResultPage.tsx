import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery, useLazyCloneQuizQuery } from '@/entities/quiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
	const profileId = useAppSelector(getProfileId);
	const { quizId } = useParams<{ quizId?: string }>();
	const navigate = useNavigate();

	const [cloneQuiz] = useLazyCloneQuizQuery();

	const { data: quiz, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId,
	});

	if (isLoading) {
		return <InterviewQuizResultPageSkeleton />;
	}

	const questions = quiz?.response.answers;

	function handleCloneQuiz() {
		cloneQuiz(quizId ?? '');
		navigate(ROUTES.interview.quiz.page);
	}

	return (
		<Flex gap="20" wrap="wrap" className={styles.container}>
			<QuizQuestionsInfo
				className={styles.questions}
				questions={questions}
				quizNumber={quiz?.quizNumber}
			/>
			<QuizAdditionalInfo className={styles.quiz} quiz={quiz} isLoading={isLoading} />
			<PassedQuestionsList
				className={styles['questions-list']}
				questions={questions ?? []}
				handleClone={handleCloneQuiz}
			/>
		</Flex>
	);
};

export default InterviewQuizResultPage;
