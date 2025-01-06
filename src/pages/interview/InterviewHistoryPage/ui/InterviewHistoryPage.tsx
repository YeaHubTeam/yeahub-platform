import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';
import { Flex } from '@/shared/ui/Flex';

import { FullPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

const InterviewHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);
	const [listLoaded, setListLoaded] = useState(false);

	const dispatch = useDispatch();

	const dateRange = useSelector(getInterviewHistoryPageDateRange);

	const onDateChange = (dates: Value) => {
		setSelectedDates(dates);
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	const onResetFilters = () => {
		setSelectedDates(null);
		dispatch(interviewHistoryPageActions.setDateRange(null));
	};

	useEffect(() => {
		return () => {
			dispatch(interviewHistoryPageActions.setDateRange(null));
		};
	}, [dispatch]);

	return (
		<Flex gap="20">
			<FullPassedQuizzesList
				dateRange={dateRange}
				onLoaded={() => {
					setListLoaded(true);
				}}
				resetFilters={onResetFilters}
			/>
			{listLoaded && <EventCalendar onDateChange={onDateChange} selectedDates={selectedDates} />}
		</Flex>
	);
};

export default InterviewHistoryPage;
