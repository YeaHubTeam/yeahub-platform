import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getSpecializationId } from '@/entities/profile';
import { useGetQuestionsSpecializationByIdCountQuery } from '@/entities/question';

import { CategoryProgressList } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { PassedQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { QuizResultButton } from '@/widgets/Landing/QuizResultModal';

import { useCalculationQuizResult } from '../../model/hooks/useCalculationQuizResult';
import { useInterviewMockQuizResultData } from '../../model/hooks/useInterviewMockQuizResultData';

import styles from './InterviewMockQuizResultPage.module.css';
import { InterviewMockQuizResultPageSkeleton } from './InterviewMockQuizResultPage.skeleton';

const InterviewMockQuizResultPage = () => {
	const { quizAnswers, isLoading } = useInterviewMockQuizResultData();
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const { isMobile, isTablet } = useScreenSize();
	const specializationId = useAppSelector(getSpecializationId);
	const { data: quizResults, isLoading: loadingResult } =
		useGetQuestionsSpecializationByIdCountQuery(specializationId);
	const skillsData = useCalculationQuizResult(quizResults);

	if (isLoading || loadingResult) return <InterviewMockQuizResultPageSkeleton />;

	return (
		<Flex gap="20" direction="column">
			<Card
				title={t(InterviewQuizResult.INTERVIEW_STATISTIC_TITLE)}
				actionTitle={t(InterviewQuizResult.INTERVIEW_STATISTIC_LINK)}
				headerAction={<QuizResultButton />}
			>
				<Flex gap="20" direction={isTablet || isMobile ? 'column' : 'row'}>
					<PassedQuestionsStatistic total={quizResults!.total} className={styles.statistic} />
					<CategoryProgressList
						title={t(InterviewQuizResult.INTERVIEW_STATISTIC_SCHEDULE)}
						className={styles.progress}
						skillsStat={skillsData?.skillStat}
					/>
				</Flex>
			</Card>
			<PassedQuestionsList className={styles['questions-list']} questions={quizAnswers || []} />
		</Flex>
	);
};

export default InterviewMockQuizResultPage;
