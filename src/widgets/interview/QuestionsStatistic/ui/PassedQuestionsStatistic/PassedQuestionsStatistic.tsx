import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { LS_ACTIVE_MOCK_QUIZ_KEY, Quiz } from '@/entities/quiz';

import { getQuestionsStats } from '../../model/lib/getQuestionsStats/getQuestionsStats';

export interface PassedQuestionsStatisticProps {
	total: number;
	isLoading?: boolean;
	className?: string;
}

export const PassedQuestionsStatistic = ({
	total,
	isLoading,
	className,
}: PassedQuestionsStatisticProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const activeMockQuiz: Quiz = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
	const inProcessCount = activeMockQuiz.response.answers.filter(
		(el) => el.answer === 'UNKNOWN',
	).length;
	const learnedCount = activeMockQuiz.response.answers.filter((el) => el.answer === 'KNOWN').length;

	const statDate = {
		uniqueQuestionsCount: total,
		learnedQuestionsCount: learnedCount,
		unlearnedQuestionsCount: activeMockQuiz.fullCount,
		inProgressQuestionsCount: inProcessCount,
	};

	const questionStats = getQuestionsStats(statDate);

	return (
		<AdditionalStatInfoGauge
			isLoading={isLoading}
			className={className}
			title={t(InterviewQuizResult.INTERVIEW_STATISTIC_QUESTION)}
			statsInfo={questionStats}
			learned={statDate?.learnedQuestionsCount ?? 0}
			total={total ?? 0}
			withOutsideShadow
		/>
	);
};
