import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz, Profile, Subscription } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { SELECT_TARIFF_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useScreenSize, useAppSelector } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';

import { getIsEmailVerified, getIsEmptySpecialization } from '@/entities/profile';
import { getHasPremiumAccess } from '@/entities/profile';
import { getLastActiveQuizInfo } from '@/entities/quiz';

import { PreviewActiveQuiz } from '../PreviewActiveQuiz/PreviewActiveQuiz';
import { PreviewInactiveQuiz } from '../PreviewInactiveQuiz/PreviewInactiveQuiz';
import { SpecializationEmptyStub } from '../SpecializationEmptyStub';

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

	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);
	const isEmailVerified = useAppSelector(getIsEmailVerified);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const lastActiveQuizInfo = useAppSelector(getLastActiveQuizInfo);

	const interviewPreparationActionTitle = useMemo(() => {
		if (!isEmailVerified && !isSpecializationEmpty) {
			return t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile });
		}

		if (!hasPremium) {
			return t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription });
		}

		return lastActiveQuizInfo ? t(InterviewQuiz.CONTINUE_QUIZ) : t(InterviewQuiz.START_QUIZ_LINK);
	}, [isEmailVerified, isSpecializationEmpty, lastActiveQuizInfo]);

	const interviewPreparationActionRoute = useMemo(() => {
		if (!isEmailVerified && !isSpecializationEmpty) {
			return ROUTES.settings.page + '#email-verify';
		}

		if (!hasPremium) {
			return SELECT_TARIFF_SETTINGS_TAB;
		}

		return lastActiveQuizInfo ? ROUTES.interview.new.page : ROUTES.interview.quiz.page;
	}, [isEmailVerified, isSpecializationEmpty, lastActiveQuizInfo]);

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
