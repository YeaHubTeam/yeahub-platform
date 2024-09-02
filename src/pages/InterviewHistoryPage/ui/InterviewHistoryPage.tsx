import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { FullInterviewHistoryList } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';

const InterviewHistoryPage = () => {
	const dispatch = useDispatch();

	const dateRange = useSelector(getInterviewHistoryPageDateRange);

	const handleDateChange = (dates: Value) => {
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	return (
		<div className={styles.container}>
			<FullInterviewHistoryList dateRange={dateRange} />
			<EventCalendar onDateChange={handleDateChange} />
		</div>
	);
};

export default InterviewHistoryPage;
