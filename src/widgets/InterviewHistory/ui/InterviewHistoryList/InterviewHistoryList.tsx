import { skipToken } from '@reduxjs/toolkit/query';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { InterviewHistoryItem } from '../InterviewHistoryItem/InterviewHistoryItem';

import styles from './InterviewHistoryList.module.css';

interface InterviewHistoryListProps {
	className?: string;
}

export const InterviewHistoryList = ({ className = '' }: InterviewHistoryListProps) => {
	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].id;
	const isVerified = profile.data?.isEmailVerified;
	const { t } = useI18nHelpers(i18Namespace.interview);
	const { data, isSuccess } = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: { limit: 3 },
					uniqueKey: 'interviewPreviewHistory',
				}
			: skipToken,
	);

	const isEmptyData = isSuccess && data.data.length === 0;

	const actionRoute = isVerified ? ROUTES.interview.history.page : EMAIL_VERIFY_SETTINGS_TAB;
	const actionTitle = isVerified
		? t(Interview.HISTORY_PREPARATION_LINKTEXT)
		: t(Interview.VERIFY_EMAIL_LINK);

	return (
		<Card
			className={`${styles['card-history']} ${className}`}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(Interview.HISTORY_PREPARATION_TITLE)}
			withShadow
			actionDisabled={isEmptyData}
		>
			{!isVerified ? (
				<h3 className={styles['no-history']}>{t(Interview.HISTORY_PREPARATION_UNVERIFIED)}</h3>
			) : !isEmptyData ? (
				<div className={styles.history}>
					<ul className={styles.list}>
						{data?.data.map((interview) => (
							<InterviewHistoryItem key={interview.id} interview={interview} />
						))}
					</ul>
				</div>
			) : (
				<h3 className={styles['no-history']}>{t(Interview.HISTORY_PREPARATION_EMPTY)}</h3>
			)}
		</Card>
	);
};
