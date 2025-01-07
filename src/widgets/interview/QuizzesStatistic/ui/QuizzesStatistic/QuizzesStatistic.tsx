import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { PercentsInfoPie } from '@/shared/ui/PercentsInfoPie';

import { ProfileQuizzesStat } from '@/entities/quiz';

export interface QuizzesStatisticProps {
	className?: string;
	quizzesStat?: ProfileQuizzesStat;
	isLoading?: boolean;
}

export const QuizzesStatistic = ({ className, quizzesStat, isLoading }: QuizzesStatisticProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const { isMobile } = useScreenSize();

	const totalAttempt = quizzesStat?.quizzesCount ?? 0;
	const attemptStats = [
		{
			value: quizzesStat?.maxQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_BEST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_BEST),
			itemStyle: { color: '#400799' },
		},
		{
			value: quizzesStat?.minQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_WORST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_WORST),
			itemStyle: { color: '#E1CEFF' },
		},
		{
			value: quizzesStat?.avgQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_AVG_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_AVG),
			itemStyle: { color: '#6A0BFF' },
		},
	];

	return (
		<PercentsInfoPie
			title={t(InterviewStatistics.ATTEMPT_STATS_TITLE)}
			attemptStats={attemptStats}
			totalAttempt={totalAttempt}
			className={className}
			isLoading={isLoading}
		/>
	);
};
