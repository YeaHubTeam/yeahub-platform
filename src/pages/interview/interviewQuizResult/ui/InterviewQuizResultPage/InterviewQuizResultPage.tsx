import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getIsVerified, getProfileId } from '@/entities/profile';
import { useGetQuizByProfileIdQuery } from '@/entities/quiz';

import { CloneQuizButton } from '@/features/quiz/cloneQuiz';

import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { QuizAdditionalInfo } from '@/widgets/interview/QuizAdditionalInfo';
import { QuizQuestionsInfo } from '@/widgets/interview/QuizzesStatistic';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { InterviewQuizResultPageSkeleton } from '@/pages/interview/interviewQuizResult';

import styles from './InterviewQuizResultPage.module.css';

const InterviewQuizResultPage = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = useAppSelector(getIsVerified);

	const profileId = useAppSelector(getProfileId);
	const { quizId = '' } = useParams<{ quizId?: string }>();

	const {
		data: quiz,
		isLoading,
		isError,
		refetch,
	} = useGetQuizByProfileIdQuery(
		{
			quizId,
			profileId,
		},
		{ skip: !isVerified || !hasPremium },
	);

	const questions = quiz?.response.answers;
	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		empty: {
			title: t(InterviewQuizResult.STUB_EMPTY_TITLE),
			subtitle: t(InterviewQuizResult.STUB_EMPTY_SUBTITLE),
			buttonText: t(InterviewQuizResult.STUB_EMPTY_BUTTON),
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			shouldVerify
			shouldPremium
			isLoading={isLoading}
			skeleton={<InterviewQuizResultPageSkeleton />}
			hasError={isError}
			hasData={Boolean(questions?.length)}
			stubs={stubs}
			content={
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
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default InterviewQuizResultPage;
