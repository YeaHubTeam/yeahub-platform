import { skipToken } from '@reduxjs/toolkit/query';

import { Loader } from '@/shared/ui/Loader';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { InterviewHistoryItem } from '../InterviewHistoryItem/InterviewHistoryItem';

import styles from './InterviewHistoryList.module.css';

export const InterviewHistoryList = () => {
	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].profileId;

	const { data, isLoading, isFetching, isSuccess } = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: { limit: 3 },
				}
			: skipToken,
	);

	if (isLoading || isFetching) {
		return <Loader />;
	}

	const isEmptyData = isSuccess && data.data.length === 0;

	return (
		<ul className={styles.list}>
			{!isEmptyData ? (
				data?.data.map((interview, idx) => (
					<InterviewHistoryItem
						key={interview.id}
						interviewNumber={idx + 1}
						interview={interview}
					/>
				))
			) : (
				<p>Данных нет</p>
			)}
		</ul>
	);
};
