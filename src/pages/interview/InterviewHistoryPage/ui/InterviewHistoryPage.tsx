import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { FullInterviewHistoryList, useGetHistory } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';
import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

const InterviewHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);

	const dispatch = useDispatch();

	const dateRange = useSelector(getInterviewHistoryPageDateRange);

	const handleDateChange = (dates: Value) => {
		setSelectedDates(dates);
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	const handleResetFilters = () => {
		setSelectedDates(null);
		dispatch(interviewHistoryPageActions.setDateRange(null));
	};

	const { isLoading } = useGetHistory();

	useEffect(() => {
		return () => {
			dispatch(interviewHistoryPageActions.setDateRange(null));
		};
	}, [dispatch]);

	if (isLoading) return <InterviewHistoryPageSkeleton />;

	return (
		<div className={styles.container}>
			<FullInterviewHistoryList dateRange={dateRange} resetFilters={handleResetFilters} />
			<EventCalendar onDateChange={handleDateChange} selectedDates={selectedDates} />
		</div>
	);
};

export default InterviewHistoryPage;
