import { useTranslation } from 'react-i18next';

import { quizCardPreview } from '@/shared/assets';
import { i18Namespace, InterviewQuiz as InterviewQuiz18 } from '@/shared/config';
import { QuizPreparationPreview } from '@/shared/ui/QuizPreparationPreview';

export const PreviewInactiveQuiz = () => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const setupList = [
		{
			id: '1.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_FIRST),
		},
		{
			id: '2.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_SECOND),
		},
		{
			id: '3.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_THIRD),
		},
		{
			id: '4.',
			title: t(InterviewQuiz18.START_QUIZ_SETUP_LIST_FOURTH),
		},
	];

	return (
		<QuizPreparationPreview
			title={t(InterviewQuiz18.START_QUIZ_TITLE)}
			description={t(InterviewQuiz18.START_QUIZ_DESCRIPTION)}
			setupList={setupList}
			image={quizCardPreview}
			imageAlt="no active quiz"
		/>
	);
};
