import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getProfileId } from '@/entities/profile';
import {
	useGetActiveQuizQuery,
	useGetQuizByProfileIdQuery,
	useLazyCloneQuizQuery,
} from '@/entities/quiz';

import { ResetActiveQuizModal } from '@/features/quiz/resetActiveQuizModal';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const profileId = useAppSelector(getProfileId);
	const { quizId } = useParams<{ quizId?: string }>();

	const [cloneQuiz] = useLazyCloneQuizQuery();

	const { data: quiz, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId,
	});

	const { data: activeQuizResponse } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});
	const activeQuiz = activeQuizResponse?.data[0] ?? null;

	if (isLoading) {
		return <InterviewQuizResultPageSkeleton />;
	}

	const questions = quiz?.response.answers;

	function handleCloneQuiz() {
		if (!activeQuiz) {
			cloneQuiz(quizId ?? '');
		} else {
			setIsOpenModal(true);
		}
	}

	function handleClose() {
		setIsOpenModal(false);
	}

	function handleOk() {
		cloneQuiz(quizId ?? '');
	}

	return (
		<>
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
			<ResetActiveQuizModal isOpen={isOpenModal} handleClose={handleClose} handleOk={handleOk} />
		</>
	);
};

export default InterviewQuizResultPage;
