import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, InterviewQuizResult } from '@/shared/config';
import { useAppSelector, useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { getProfileId } from '@/entities/profile';
import { useGetActiveQuizQuery } from '@/entities/quiz';

import { useLazyCloneQuizQuery } from '../../api/cloneQuizApi';

const ResetActiveQuizModal = lazy(() => import('../ResetActiveQuizModal/ResetActiveQuizModal'));

export const CloneQuizButton = () => {
	const { quizId = '' } = useParams<{ quizId?: string }>();
	const { isOpen, onToggle, onClose } = useModal();

	const profileId = useAppSelector(getProfileId);

	const { t } = useTranslation(i18Namespace.interviewQuizResult);

	const [cloneQuiz, { isLoading: isCloneQuizLoading }] = useLazyCloneQuizQuery();

	const { data: activeQuiz, isLoading: isGetActiveQuizLoading } = useGetActiveQuizQuery({
		profileId,
		page: 1,
		limit: 1,
	});

	const onCloneQuiz = () => {
		if (!activeQuiz) {
			cloneQuiz(quizId);
		} else {
			onToggle();
		}
	};

	const onResetActiveQuizClose = () => {
		onClose();
	};

	const onResetActiveQuizOk = () => {
		cloneQuiz(quizId);
	};

	return (
		<>
			<Button
				size="large"
				onClick={onCloneQuiz}
				disabled={isCloneQuizLoading || isGetActiveQuizLoading}
			>
				{t(InterviewQuizResult.CLONE_BUTTON)}
			</Button>
			<ResetActiveQuizModal
				isOpen={isOpen}
				onClose={onResetActiveQuizClose}
				onOk={onResetActiveQuizOk}
			/>
		</>
	);
};
