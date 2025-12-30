import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { PercentsInfoPie } from '@/shared/ui/PercentsInfoPie';

import { Answers } from '@/entities/quiz';

import { getQuizQuestionsInfo } from '../../model/getQuizQuestionsInfo';

export interface QuizQuestionsInfoProps {
	className?: string;
	questions?: Answers[];
	quizNumber?: number;
}

export const QuizQuestionsInfo = ({ className, questions, quizNumber }: QuizQuestionsInfoProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const quizQuestionsStats = getQuizQuestionsInfo(questions);

	return (
		<PercentsInfoPie
			title={t(InterviewQuizResult.TITLE_QUESTIONS_ANSWERS, { title: quizNumber })}
			attemptStats={quizQuestionsStats.stats}
			totalAttempt={quizQuestionsStats.questionsTotalCount}
			className={className}
		/>
	);
};
