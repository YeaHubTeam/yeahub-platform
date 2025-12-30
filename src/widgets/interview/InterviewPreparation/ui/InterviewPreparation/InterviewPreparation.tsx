import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, InterviewQuiz, Profile, ROUTES } from '@/shared/config';
import { useAppDispatch, useAppSelector, useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import {
	getHasPremiumAccess,
	getIsVerified,
	getIsEmptySpecialization,
	getProfileId,
} from '@/entities/profile';
import {
	getLastActiveQuizInfo,
	setActiveQuizQuestions,
	getValidActiveMockQuizFromLS,
} from '@/entities/quiz';

import { PreviewActiveQuiz } from '../PreviewActiveQuiz/PreviewActiveQuiz';
import { PreviewInactiveQuiz } from '../PreviewInactiveQuiz/PreviewInactiveQuiz';
import { SpecializationEmptyStub } from '../SpecializationEmptyStub/SpecializationEmptyStub';

export interface InterviewPreparationProps {
	className?: string;
}

export const InterviewPreparation = ({ className }: InterviewPreparationProps) => {
	const { t } = useTranslation([
		i18Namespace.interviewQuiz,
		i18Namespace.profile,
		i18Namespace.subscription,
	]);
	const { isMobile } = useScreenSize();
	const dispatch = useAppDispatch();

	const profileId = useAppSelector(getProfileId);
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);
	const isEmailVerified = useAppSelector(getIsVerified);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const lastActiveQuizInfo = useAppSelector(getLastActiveQuizInfo);

	const interviewPreparationActionTitle = useMemo(() => {
		if (!isEmailVerified && !isSpecializationEmpty) {
			return t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile });
		}

		return lastActiveQuizInfo ? t(InterviewQuiz.CONTINUE_QUIZ) : t(InterviewQuiz.START_QUIZ_LINK);
	}, [isEmailVerified, isSpecializationEmpty, lastActiveQuizInfo]);

	const interviewPreparationActionRoute = useMemo(() => {
		if (!isEmailVerified && !isSpecializationEmpty) {
			return ROUTES.settings.page + '#email-verify';
		}

		return lastActiveQuizInfo ? ROUTES.interview.new.page : ROUTES.interview.quiz.page;
	}, [isEmailVerified, isSpecializationEmpty, lastActiveQuizInfo]);

	useEffect(() => {
		if (!hasPremium) {
			const { profileActiveQuiz } = getValidActiveMockQuizFromLS(profileId);
			profileActiveQuiz &&
				dispatch(setActiveQuizQuestions({ questions: profileActiveQuiz, shouldSaveToLS: false }));
		}
	}, []);

	return (
		<Card
			className={className}
			actionDisabled={isSpecializationEmpty}
			title={t(InterviewQuiz.PREVIEW_TITLE)}
			actionTitle={interviewPreparationActionTitle}
			actionRoute={interviewPreparationActionRoute}
			withShadow={!isMobile}
		>
			{isSpecializationEmpty && <SpecializationEmptyStub />}
			{lastActiveQuizInfo && !isSpecializationEmpty && <PreviewActiveQuiz />}
			{!lastActiveQuizInfo && !isSpecializationEmpty && <PreviewInactiveQuiz />}
		</Card>
	);
};
