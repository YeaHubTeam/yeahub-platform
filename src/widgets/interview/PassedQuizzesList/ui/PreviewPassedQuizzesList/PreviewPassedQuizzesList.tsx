import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory, Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { PreviewPassedQuizzesItem } from '../PreviewPassedQuizzesItem/PreviewPassedQuizzesItem';

import styles from './PreviewPassedQuizzesList.module.css';

export interface InterviewHistoryListProps {
	className?: string;
}

export const PreviewPassedQuizzesList = ({ className }: InterviewHistoryListProps) => {
	const fullProfile = useAppSelector(getFullProfile);
	const profileId = useAppSelector(getProfileId);
	const isVerified = fullProfile?.isEmailVerified;
	const { t } = useTranslation([i18Namespace.interviewHistory, i18Namespace.profile]);
	const { data, isSuccess } = useGetHistoryQuizQuery({
		profileId,
		limit: 3,
		uniqueKey: 'interviewPreviewHistory',
	});

	const { isMobile } = useScreenSize();

	const isEmptyData = isSuccess && data.data.length === 0;

	const actionRoute = isVerified ? ROUTES.interview.history.page : EMAIL_VERIFY_SETTINGS_TAB;
	const actionTitle = isVerified
		? t(InterviewHistory.LINK)
		: t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile });

	return (
		<Card
			className={className}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(InterviewHistory.TITLE)}
			withShadow
			actionDisabled={isEmptyData}
			isTitleCenter={isMobile}
		>
			{!isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(InterviewHistory.UNVERIFIED)}
				</Text>
			)}
			{isEmptyData && isVerified && (
				<Text variant="body4" color="black-700" className={styles['no-history']}>
					{t(InterviewHistory.EMPTY)}
				</Text>
			)}
			{!isEmptyData && isVerified && (
				<Flex componentType="ul" direction="column" gap="8" className={styles.list}>
					{data?.data.map((interview) => (
						<PreviewPassedQuizzesItem key={interview.id} interview={interview} />
					))}
				</Flex>
			)}
		</Card>
	);
};
