import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { getHasPremiumAccess } from '@/entities/profile';
import { ActiveQuiz, Answers } from '@/entities/quiz';

import { useFinishQuizMutation } from '../../api/finishQuizApi';

interface FinishQuizButtonProps {
	activeQuizQuestions: Answers[];
	activeQuiz?: ActiveQuiz;
	isDisabled: boolean;
}

export const FinishQuizButton = ({
	activeQuizQuestions,
	activeQuiz,
	isDisabled,
}: FinishQuizButtonProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const navigate = useNavigate();

	const [finishQuiz, { isLoading }] = useFinishQuizMutation();

	const onFinishQuiz = () => {
		if (hasPremium) {
			if (activeQuiz) {
				const quizToSave = {
					...activeQuiz,
					response: {
						answers: activeQuizQuestions,
					},
				};
				finishQuiz(quizToSave);
			}
		} else {
			navigate(ROUTES.quiz.result.route);
		}
	};

	return (
		<Button onClick={onFinishQuiz} disabled={isDisabled || isLoading}>
			{t(InterviewQuiz.CHECK)}
		</Button>
	);
};
