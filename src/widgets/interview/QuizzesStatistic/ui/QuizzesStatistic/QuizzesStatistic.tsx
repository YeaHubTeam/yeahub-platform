import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewStatistics } from '@/shared/config/i18n/i18nTranslations';
import { useScreenSize } from '@/shared/hooks';
import { PercentsInfoPie } from '@/shared/ui/PercentsInfoPie';

import { ProfileQuizzesStat } from '@/entities/quiz';

export interface QuizzesStatisticProps {
	className?: string;
	quizzesStat?: ProfileQuizzesStat;
}

export const QuizzesStatistic = ({ className, quizzesStat }: QuizzesStatisticProps) => {
	const { t } = useTranslation(i18Namespace.interviewStatistics);
	const { isMobile } = useScreenSize();

	const totalAttempt = quizzesStat?.quizzesCount ?? 0;
	const attemptStats = [
		{
			value: quizzesStat?.maxQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_BEST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_BEST),
			itemStyle: { color: '#008616' },
		},
		{
			value: quizzesStat?.minQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_WORST_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_WORST),
			itemStyle: { color: '#af0932' },
		},
		{
			value: quizzesStat?.avgQuizResult ?? 0,
			name: isMobile
				? t(InterviewStatistics.ATTEMPT_STATS_AVG_MOBILE)
				: t(InterviewStatistics.ATTEMPT_STATS_AVG),
			itemStyle: { color: '#ffc234' },
		},
	];

	return (
		<PercentsInfoPie
			title={t(InterviewStatistics.ATTEMPT_STATS_TITLE)}
			attemptStats={attemptStats}
			totalAttempt={totalAttempt}
			className={className}
		/>
	);
};
