import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetQuestionsSpecializationByIdCountQuery } from '@/entities/question';
import { LS_ACTIVE_SPECIALIZATION_ID } from '@/entities/specialization';

import { CategoryProgressList } from '@/widgets/interview/CategoryProgressList';
import { PassedQuestionsList } from '@/widgets/interview/PassedQuestionsList';
import { PassedQuestionsStatistic } from '@/widgets/interview/QuestionsStatistic';
import { QuizResultButton } from '@/widgets/Landing/QuizResultModal';

import { PublicQuizResultPageSkeleton } from '@/pages/landing/PublicQuizResultPage/ui/PublicQuizResultPage.skeleton';

import { useCalculationQuizResult } from '../model/hooks/useCalculationQuizResult';
import { usePublicQuizResultData } from '../model/hooks/usePublicQuizResultData';

import styles from './PublicQuizResultPage.module.css';

const PublicQuizResultPage = () => {
	const { quizAnswers, isLoading } = usePublicQuizResultData();
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	const { isMobile, isTablet } = useScreenSize();

	const specializationId = getJSONFromLS(LS_ACTIVE_SPECIALIZATION_ID);
	const { data: quizResults, isLoading: loadingResult } =
		useGetQuestionsSpecializationByIdCountQuery(specializationId);
	const skillsData = useCalculationQuizResult(quizResults);

	if (isLoading || loadingResult) return <PublicQuizResultPageSkeleton />;

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

export default PublicQuizResultPage;
