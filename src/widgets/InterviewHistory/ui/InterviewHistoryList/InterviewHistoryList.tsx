import { skipToken } from '@reduxjs/toolkit/query';

import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { Loader } from '@/shared/ui/Loader';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { InterviewHistoryItem } from '../InterviewHistoryItem/InterviewHistoryItem';

import styles from './InterviewHistoryList.module.css';

export const InterviewHistoryList = () => {
	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].profileId;
	const { t } = useI18nHelpers(i18Namespace.interview);
	const { data, isLoading, isFetching, isSuccess } = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: { limit: 3 },
					uniqueKey: 'interviewPreviewHistory',
				}
			: skipToken,
	);

	if (isLoading || isFetching) {
		return <Loader />;
	}

	const isEmptyData = isSuccess && data.data.length === 0;

	return (
		<Card
			className={styles['card-history']}
			actionRoute={ROUTES.interview.history.page}
			actionTitle={t(Interview.HISTORY_PREPARATION_LINKTEXT)}
			title={t(Interview.HISTORY_PREPARATION_TITLE)}
			withShadow
			actionDisabled={isEmptyData}
		>
			{!isEmptyData ? (
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
