import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppDispatch, useAppSelector, useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { getProfileId } from '@/entities/profile';
import { ActiveQuiz, Answers, clearActiveMockQuizState } from '@/entities/quiz';

import { useInterruptQuizMutation } from '../../api/interruptQuizApi';

const ConfirmInterruptQuizModal = lazy(
	() => import('../ConfirmInterruptQuizModal/ConfirmInterruptQuizModal'),
);

interface InterruptQuizButtonProps {
	className?: string;
	activeQuizQuestions: Answers[];
	activeQuiz?: ActiveQuiz;
}

export const InterruptQuizButton = ({
	className,
	activeQuizQuestions,
	activeQuiz,
}: InterruptQuizButtonProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const profileId = useAppSelector(getProfileId);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isOpen: isOpenInterruptQuizConfirmModal, onToggle: onToggleInterruptQuizConfirmModal } =
		useModal();

	const [saveInterruptedResult, { isLoading }] = useInterruptQuizMutation();

	const onInterruptQuiz = () => {
		if (activeQuiz) {
			const quizToSave = {
				...activeQuiz,
				response: {
					answers: activeQuizQuestions.map((quest) => ({
						...quest,
						answer: quest.answer ?? 'UNKNOWN',
					})),
				},
			};
			saveInterruptedResult(quizToSave);
		} else {
			dispatch(clearActiveMockQuizState({ profileId }));
			navigate(ROUTES.interview.page);
		}
	};

	return (
		<>
			<Button
				className={className}
				disabled={isLoading}
				onClick={onToggleInterruptQuizConfirmModal}
			>
				{t(InterviewQuiz.COMPLETE)}
			</Button>
			<ConfirmInterruptQuizModal
				isOpen={isOpenInterruptQuizConfirmModal}
				onClose={onToggleInterruptQuizConfirmModal}
				onOk={onInterruptQuiz}
			/>
		</>
	);
};
