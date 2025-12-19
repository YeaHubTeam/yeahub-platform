import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EventCalendar, Value } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { FullPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';

import { getInterviewHistoryPageDateRange } from '../../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../../model/slices/InterviewHistoryPageSlice';

import style from './InterviewHistoryPage.module.css';
import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

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
		dispatch(interviewHistoryPageActions.resetDateRange());
	};

	useEffect(() => {
		return () => {
			dispatch(interviewHistoryPageActions.resetDateRange());
		};
	}, [dispatch]);

	return (
		<Flex gap="20">
			{!listLoaded && <InterviewHistoryPageSkeleton />}
			<div className={classNames(style['container-list'], { [style.hidden]: !listLoaded })}>
				<FullPassedQuizzesList
					dateRange={dateRange}
					onLoaded={() => {
						setListLoaded(true);
					}}
					resetFilters={onResetFilters}
				/>
			</div>
			{listLoaded && <EventCalendar onDateChange={onDateChange} selectedDates={selectedDates} />}
		</Flex>
	);
};

export default InterviewHistoryPage;
