import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getFullProfile, getHasPremiumAccess } from '@/entities/profile';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

interface QuestionActionsProps {
	profileId: number | string;
	questionId: number | string;
	checksCount: number | undefined;
}

export const QuestionActions = ({ profileId, questionId, checksCount }: QuestionActionsProps) => {
	const { isMobile, isTablet, isMobileS } = useScreenSize();
	const profile = useAppSelector(getFullProfile);
	const hasPremiumAccess = useAppSelector(getHasPremiumAccess);
	const { t } = useTranslation([i18Namespace.subscription]);

	const buttonVariant = isMobile || isTablet ? 'link-gray' : 'tertiary';
	const isEmailVerified = profile?.isEmailVerified;

	return (
		<Flex direction="column" gap="20">
			<Card
				actionRoute={!hasPremiumAccess && !isMobileS ? ROUTES.settings.page : undefined}
				actionTitle={
					!hasPremiumAccess && !isMobileS
						? t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })
						: undefined
				}
			>
				<Flex direction="column" gap="24" align="center">
					<Flex justify="center" gap="40" align="center">
						<LearnQuestionButton
							profileId={profileId}
							questionId={questionId}
							isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount >= 3)}
							variant={buttonVariant}
						/>
						<ResetQuestionStudyProgressButton
							profileId={profileId}
							questionId={questionId}
							isDisabled={!isEmailVerified || (checksCount !== undefined && checksCount === 0)}
							variant={buttonVariant}
						/>
					</Flex>
				</Flex>
			</Card>
		</Flex>
	);
};
