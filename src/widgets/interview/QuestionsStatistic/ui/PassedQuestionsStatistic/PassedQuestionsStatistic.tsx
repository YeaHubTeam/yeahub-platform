import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { useAppSelector, useCurrentProject } from '@/shared/hooks';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { getProfileId } from '@/entities/profile';
import { Answers, LS_ACTIVE_MOCK_PUBLIC_QUIZ_KEY, LS_ACTIVE_MOCK_QUIZ_KEY } from '@/entities/quiz';

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
	const project = useCurrentProject();
	const profileId = useAppSelector(getProfileId);
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const activeMockQuiz = getJSONFromLS(
		project === 'landing' ? LS_ACTIVE_MOCK_PUBLIC_QUIZ_KEY : LS_ACTIVE_MOCK_QUIZ_KEY,
	);
	const answers =
		project === 'landing' ? activeMockQuiz.response.answers : activeMockQuiz[profileId];
	// const activeMockQuiz: Quiz = getJSONFromLS(LS_ACTIVE_MOCK_PUBLIC_QUIZ_KEY);
	const inProcessCount = answers.filter((el: Answers) => el.answer === 'UNKNOWN').length;
	const learnedCount = answers.filter((el: Answers) => el.answer === 'KNOWN').length;

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
