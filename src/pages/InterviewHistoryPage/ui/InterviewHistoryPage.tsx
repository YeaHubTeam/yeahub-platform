import { skipToken } from '@reduxjs/toolkit/query/react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';

const InterviewHistoryPage = () => {
	const dispatch = useDispatch();
	const dateRange = useSelector(getInterviewHistoryPageDateRange);

	const profile = useProfileQuery();
	const profileId = profile.data?.profiles[0].profileId;
	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const { data: historyData } = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: {
						startAfter: dateRange ? startAfter.toISOString() : undefined,
						startBefore: dateRange ? startBefore.toISOString() : undefined,
					},
				}
			: skipToken,
	);

	const handleDateChange = (dates: Value) => {
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
