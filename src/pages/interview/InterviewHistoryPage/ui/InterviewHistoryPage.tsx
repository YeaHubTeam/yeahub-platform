import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';
import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

const InterviewHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);
	const [listLoaded, setListLoaded] = useState(false);

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

	useEffect(() => {
		return () => {
			dispatch(interviewHistoryPageActions.setDateRange(null));
		};
	}, [dispatch]);

	return (
		<>
			<div className={styles.container}>
				<FullInterviewHistoryList
					dateRange={dateRange}
					onLoaded={() => {
						setListLoaded(true);
					}}
					resetFilters={handleResetFilters}
				/>
				{listLoaded && (
					<EventCalendar onDateChange={handleDateChange} selectedDates={selectedDates} />
				)}
			</div>

			{!listLoaded && <InterviewHistoryPageSkeleton />}
		</>
	);
};

export default InterviewHistoryPage;
