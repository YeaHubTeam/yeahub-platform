import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config';
import { InterviewHistory, ROUTES } from '@/shared/config';
import { EventCalendar, Value } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { FullPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { useInterviewHistoryData } from '../../model/hooks/useInterviewHistoryData';
import { getInterviewHistoryPageDateRange } from '../../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../../model/slices/InterviewHistoryPageSlice';

import style from './InterviewHistoryPage.module.css';
import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

const InterviewHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const dateRange = useSelector(getInterviewHistoryPageDateRange);
	const { data, isLoading, isError, refetch, onLoadNext } = useInterviewHistoryData(dateRange);
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const hasFilters = selectedDates !== null;

	const onDateChange = (dates: Value) => {
		setSelectedDates(dates);
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	const onResetFilters = () => {
		setSelectedDates(null);
		dispatch(interviewHistoryPageActions.resetDateRange());
	};

	const onMoveToInterview = () => {
		navigate(ROUTES.interview.quiz.page);
	};

	useEffect(() => {
		return () => {
			dispatch(interviewHistoryPageActions.resetDateRange());
		};
	}, [dispatch]);

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		empty: {
			title: t(InterviewHistory.STUB_EMPTY_TITLE),
			subtitle: t(InterviewHistory.STUB_EMPTY_SUBTITLE),
			buttonText: t(InterviewHistory.STUB_EMPTY_BUTTON),
			onClick: onMoveToInterview,
		},
	};

	return (
		<PageWrapper
			shouldVerify
			shouldPremium
			isLoading={isLoading}
			hasError={isError}
			hasData={Boolean(data?.length)}
			hasFilters={hasFilters}
			stubs={stubs}
			skeleton={<InterviewHistoryPageSkeleton />}
			content={
				<div className={classNames(style['container-list'])}>
					<FullPassedQuizzesList data={data ?? []} onLoadNext={onLoadNext} />
				</div>
			}
		>
			{({ content }) => (
				<Flex gap="20">
					{content}
					<EventCalendar onDateChange={onDateChange} selectedDates={selectedDates} />
				</Flex>
			)}
		</PageWrapper>
	);
};

export default InterviewHistoryPage;
