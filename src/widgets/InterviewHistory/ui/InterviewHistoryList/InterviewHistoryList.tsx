import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewHistory, Profile } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';

import { getFullProfile, getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { InterviewHistoryItem } from '../InterviewHistoryItem/InterviewHistoryItem';

import styles from './InterviewHistoryList.module.css';

interface InterviewHistoryListProps {
	className?: string;
}

export const InterviewHistoryList = ({ className = '' }: InterviewHistoryListProps) => {
	const fullProfile = useAppSelector(getFullProfile);
	const profileId = useAppSelector(getProfileId);
	const isVerified = fullProfile?.isEmailVerified;
	const { t } = useTranslation([i18Namespace.interviewHistory, i18Namespace.profile]);
	const { data, isSuccess } = useGetHistoryQuizQuery({
		profileId,
		limit: 3,
		uniqueKey: 'interviewPreviewHistory',
	});

	const isEmptyData = isSuccess && data.data.length === 0;

	const actionRoute = isVerified ? ROUTES.interview.history.page : EMAIL_VERIFY_SETTINGS_TAB;
	const actionTitle = isVerified
		? t(InterviewHistory.LINK)
		: t(Profile.EMAIL_VERIFICATION_VERIFY_STUB_LINK, { ns: i18Namespace.profile });

	return (
		<Card
			className={classNames(styles['card-history'], className)}
			actionRoute={actionRoute}
			actionTitle={actionTitle}
			title={t(InterviewHistory.TITLE)}
			withShadow
			actionDisabled={isEmptyData}
		>
			{!isVerified ? (
				<h3 className={styles['no-history']}>{t(InterviewHistory.UNVERIFIED)}</h3>
			) : !isEmptyData ? (
				<div className={styles.history}>
					<ul className={styles.list}>
						{data?.data.map((interview) => (
							<InterviewHistoryItem key={interview.id} interview={interview} />
						))}
					</ul>
				</div>
			) : (
				<h3 className={styles['no-history']}>{t(InterviewHistory.EMPTY)}</h3>
			)}
		</Card>
	);
};
