import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, InterviewQuiz, ROUTES } from '@/shared/config';
import { useAppDispatch, useAppSelector, useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { getHasPremiumAccess, getProfileId } from '@/entities/profile';
import { ActiveQuiz, Answers, clearActiveMockQuizState } from '@/entities/quiz';

import { useInterruptQuizMutation } from '../../api/interruptQuizApi';

const ConfirmInterruptQuizModal = lazy(
	() => import('../ConfirmInterruptQuizModal/ConfirmInterruptQuizModal'),
);

interface InterruptQuizButtonProps {
	activeQuizQuestions: Answers[];
	activeQuiz?: ActiveQuiz;
}

export const InterruptQuizButton = ({
	activeQuizQuestions,
	activeQuiz,
}: InterruptQuizButtonProps) => {
	const { t } = useTranslation(i18Namespace.interviewQuiz);
	const profileId = useAppSelector(getProfileId);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isOpen: isOpenInterruptQuizConfirmModal, onToggle: onToggleInterruptQuizConfirmModal } =
		useModal();

	const [saveInterruptedResult, { isLoading }] = useInterruptQuizMutation();

	const onInterruptQuiz = () => {
		if (hasPremium) {
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
			}
		} else {
			dispatch(clearActiveMockQuizState({ profileId }));
			navigate(ROUTES.interview.page);
		}
	};

	return (
		<>
			<Button
				disabled={isLoading}
				variant="destructive-secondary"
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
