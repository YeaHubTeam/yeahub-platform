import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Subscription } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getHasPremiumAccess } from '@/entities/profile';

import { LearnQuestionButton } from '@/features/quiz/learnQuestion';
import { ResetQuestionStudyProgressButton } from '@/features/quiz/resetQuestionStudyProgress';

import styles from './QuestionActions.module.css';

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

	const linkContent = (
		<>
			<Text variant="body3-strong" color="purple-700">
				{t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription })}
			</Text>
			<Icon icon="arrowRight" size={24} color="purple-700" className={styles.icon} />
		</>
	);

	return (
		<Flex direction="column" gap="20">
			<Card className={styles.card}>
				<Flex direction="column" gap="24" align="center">
					{!hasPremiumAccess && !isMobileS && (
						<Link to={ROUTES.settings.page} className={styles['desktop-link']}>
							{linkContent}
						</Link>
					)}
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
			{!hasPremiumAccess && isMobileS && (
				<Link to={ROUTES.settings.page} className={styles.link}>
					{linkContent}
				</Link>
			)}
		</Flex>
	);
};
