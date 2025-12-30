import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewStatistics } from '@/shared/config';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { ProfileQuestionsStat } from '@/entities/quiz';

import { getQuestionsStats } from '../../lib/getQuestionsStats/getQuestionsStats';

export interface FullQuestionsStatisticProps {
	questionsStat?: ProfileQuestionsStat;
	isLoading?: boolean;
	className?: string;
}

export const FullQuestionsStatistic = ({
	questionsStat,
	isLoading,
	className,
}: FullQuestionsStatisticProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);

	const questionStats = getQuestionsStats(questionsStat);

	return (
		<AdditionalStatInfoGauge
			isLoading={isLoading}
			className={className}
			title={t(InterviewStatistics.QUESTION_STATS_TITLE)}
			statsInfo={questionStats}
			learned={questionsStat?.learnedQuestionsCount ?? 0}
			total={questionsStat?.uniqueQuestionsCount ?? 0}
		/>
	);
};
