import { skipToken } from '@reduxjs/toolkit/query/react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar/EventCalendar';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageFilter } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';

const InterviewHistoryPage = () => {
	const dispatch = useDispatch();
	const dateRange = useSelector(getInterviewHistoryPageFilter);

	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].profileId;

	const { data: historyData } = useGetHistoryQuizQuery(
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
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	return (
		<div className={styles.container}>
			<FullInterviewHistoryList quizzesHistory={historyData?.data} />
			<EventCalendar onDateChange={handleDateChange} />
		</div>
	);
};

export default InterviewHistoryPage;
