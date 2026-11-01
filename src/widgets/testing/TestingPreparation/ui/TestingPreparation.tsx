import { useTranslation } from 'react-i18next';

import { quizCardPreview } from '@/shared/assets';
import { i18Namespace, InterviewQuiz as InterviewQuiz18, Testing, ROUTES } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { QuizPreparationPreview } from '@/shared/ui/QuizPreparationPreview';

import type { ActiveTest } from '@/entities/testing';

import { PreviewActiveTest } from './PreviewActiveTest';

interface TestingPreparationProps {
	activeTest?: ActiveTest;
	className?: string;
}

export const TestingPreparation = ({ activeTest, className }: TestingPreparationProps) => {
	const { t } = useTranslation(i18Namespace.testing);
	const { t: tInterviewQuiz } = useTranslation(i18Namespace.interviewQuiz);
	const { isMobile } = useScreenSize();

	const hasActiveTest = Boolean(activeTest);

	const setupList = [
		{ id: '1.', title: tInterviewQuiz(InterviewQuiz18.START_QUIZ_SETUP_LIST_FIRST) },
		{ id: '2.', title: tInterviewQuiz(InterviewQuiz18.START_QUIZ_SETUP_LIST_SECOND) },
		{ id: '3.', title: tInterviewQuiz(InterviewQuiz18.START_QUIZ_SETUP_LIST_THIRD) },
		{ id: '4.', title: tInterviewQuiz(InterviewQuiz18.START_QUIZ_SETUP_LIST_FOURTH) },
	];

	return (
		<Card
			className={className}
			title={t(Testing.PREVIEW_TITLE)}
			actionTitle={hasActiveTest ? t(Testing.CONTINUE_TEST) : t(Testing.CREATE_TEST)}
			actionRoute={hasActiveTest ? ROUTES.test.new.page : ROUTES.test.page}
			withShadow={!isMobile}
		>
			{activeTest ? (
				<PreviewActiveTest activeTest={activeTest} />
			) : (
				<QuizPreparationPreview
					title={tInterviewQuiz(InterviewQuiz18.START_QUIZ_TITLE)}
					description={tInterviewQuiz(InterviewQuiz18.START_QUIZ_DESCRIPTION)}
					setupList={setupList}
					image={quizCardPreview}
					imageAlt="no active quiz"
				/>
			)}
		</Card>
	);
};
