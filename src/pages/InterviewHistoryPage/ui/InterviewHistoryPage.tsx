import { skipToken } from '@reduxjs/toolkit/query/react';
import { useState, useEffect } from 'react';

import { EventCalendar } from '@/shared/ui/Calendar/EventCalendar';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import styles from './InterviewHistoryPage.module.css';

const InterviewHistoryPage = () => {
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].profileId;

	const { data: historyData, refetch } = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: {
						startAfter: dateRange[0] ? dateRange[0].toISOString() : undefined,
						startBefore: dateRange[1] ? dateRange[1].toISOString() : undefined,
					},
				}
			: skipToken,
	);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		setDateRange(dates);
	};

	useEffect(() => {
		if (dateRange[0] && dateRange[1]) {
			refetch();
		}
	}, [dateRange, refetch]);

	return (
		<div className={styles.container}>
			<FullInterviewHistoryList data={historyData?.data} />
			<EventCalendar onDateChange={handleDateChange} />
		</div>
	);
};

export default InterviewHistoryPage;
