import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useCheckSpecialization } from '@/shared/hooks/useCheckSpecialization';
import { EventCalendar } from '@/shared/ui/Calendar';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { useProfileQuery } from '@/entities/auth';

import { FullInterviewHistoryList, useGetHistory } from '@/widgets/FullInterviewHistory';

import { getInterviewHistoryPageDateRange } from '../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../model/slices/InterviewHistoryPageSlice';

import styles from './InterviewHistoryPage.module.css';
import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

const InterviewHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);

	const { data: userProfile } = useProfileQuery();
	const isSpecializationEmpty = useCheckSpecialization(userProfile);

	const navigate = useNavigate();

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

	if (isSpecializationEmpty) navigate(ROUTES.interview.page);

	return (
		<div className={styles.container}>
			<FullInterviewHistoryList dateRange={dateRange} resetFilters={handleResetFilters} />
			<EventCalendar onDateChange={handleDateChange} selectedDates={selectedDates} />
		</div>
	);
};

export default InterviewHistoryPage;
