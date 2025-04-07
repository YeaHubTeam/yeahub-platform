import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import { formatDate } from '@/shared/helpers/formatDate';
import { formatTime } from '@/shared/helpers/formatTime';
import { getTimeDifference } from '@/shared/helpers/getTimeDifference';
import { AdditionalStatInfoGauge } from '@/shared/ui/AdditionalStatInfoGauge';

import { Quiz } from '@/entities/quiz';

export interface QuizAdditionalInfoProps {
	className?: string;
	quiz?: Quiz;
	isLoading?: boolean;
}

export const QuizAdditionalInfo = ({ className, quiz, isLoading }: QuizAdditionalInfoProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const learnedQuestions = (quiz?.questions || []).filter((question) => question.isLearned).length;

	const questionStats = [
		{
			title: t(InterviewQuizResult.PASSED_QUESTION),
			value: `${learnedQuestions ?? 0}/${quiz?.fullCount ?? 0}`,
		},
		{
			title: t(InterviewQuizResult.TIME),
			value: formatTime(new Date((quiz?.startDate as string) ?? new Date().toDateString())),
		},
		{
			title: t(InterviewQuizResult.DATE),
			value: formatDate(
				new Date((quiz?.startDate as string) ?? new Date().toDateString()),
				'dd.MM.yyyy',
			),
		},
		{
			title: t(InterviewQuizResult.DURATION),
			value: getTimeDifference(quiz?.startDate ?? '', quiz?.endDate ?? ''),
		},
	];

	return (
		<AdditionalStatInfoGauge
			isLoading={isLoading}
			isTitleCentered={true}
			className={className}
			title={t(InterviewQuizResult.TITLE_STAT)}
			statsInfo={questionStats}
			learned={quiz?.successCount ?? 0}
			total={quiz?.fullCount ?? 1}
		/>
	);
};
