import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import {
	useGetActiveQuizQuery,
	useGetQuizByProfileIdQuery,
	useLazyCloneQuizQuery,
} from '@/entities/quiz';

import { ResetActiveQuizModal } from '@/features/quiz/resetActiveQuizModal';

import { CategoryProgressList } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/InterviewQuizResultPage';

import { useCalculationInterviewResult } from '../../CreateQuizPage/model/hooks/useCalculationInterviewResult';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

	const profileId = useAppSelector(getProfileId);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const { quizId } = useParams<{ quizId?: string }>();

	const [cloneQuiz] = useLazyCloneQuizQuery();

	const { data: quiz, isLoading } = useGetQuizByProfileIdQuery({
		quizId: quizId ?? '',
		profileId,
	});

	const questions = quiz?.response.answers;
	const interviewResult = useCalculationInterviewResult(quiz, questions);

	const { data: activeQuizResponse } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});
	const activeQuiz = activeQuizResponse?.data[0] ?? null;

	if (isLoading) {
		return <InterviewQuizResultPageSkeleton />;
	}

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
				{hasPremium && (
					<QuizQuestionsInfo
						className={styles.questions}
						questions={questions}
						quizNumber={quiz?.quizNumber}
					/>
				)}
				<QuizAdditionalInfo className={styles.quiz} quiz={quiz} isLoading={isLoading} />
				{!hasPremium && (
					<CategoryProgressList
						title={t(InterviewStatistics.PROGRESS_TITLE)}
						className={styles.questions}
						skillsStat={interviewResult?.skillStat}
					/>
				)}
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
