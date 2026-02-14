import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, InterviewHistory, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { EventCalendar, Value } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { getHasPremiumAccess, getIsVerified, getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { FullPassedQuizzesList } from '@/widgets/interview/PassedQuizzesList';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { getInterviewHistoryPageDateRange } from '../../model/selectors/InterviewHistoryPageSelectors';
import { interviewHistoryPageActions } from '../../model/slices/InterviewHistoryPageSlice';

import { InterviewHistoryPageSkeleton } from './InterviewHistoryPage.skeleton';

const InterviewHistoryPage = () => {
	const { t } = useTranslation(i18Namespace.interviewHistory);

	const [page, setPage] = useState(1);
	const [uniqueKey, setUniqueKey] = useState(Date.now().toString());
	const isFirstMount = useRef(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isVerified = useAppSelector(getIsVerified);

	const dateRange = useSelector(getInterviewHistoryPageDateRange);
	const profileId = useAppSelector(getProfileId);
	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const { data, isLoading, isFetching, isError, refetch } = useGetHistoryQuizQuery(
		{
			profileId,
			page,
			startAfter: startAfter ? startAfter.toISOString() : undefined,
			startBefore: startBefore ? startBefore.toISOString() : undefined,
			uniqueKey,
		},
		{ skip: !(hasPremium && isVerified) },
	);

	const hasMore = Boolean(data?.data && data.data.length < (data?.total ?? 0));

	const onDateChange = (dates: Value) => {
		dispatch(interviewHistoryPageActions.setDateRange(dates));
	};

	const onResetFilters = () => {
		dispatch(interviewHistoryPageActions.resetDateRange());
	};

	const onMoveToInterview = () => {
		navigate(ROUTES.interview.quiz.page);
	};

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && hasMore) {
			setPage((prevPage) => prevPage + 1);
		}
	}, [isLoading, isFetching, hasMore]);

	useEffect(() => {
		if (isFirstMount.current) {
			isFirstMount.current = false;
			return;
		}
		setUniqueKey(Date.now().toString());
		setPage(1);
	}, [dateRange]);

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
			title: t(InterviewHistory.EMPTY_TITLE),
			subtitle: t(InterviewHistory.EMPTY_SUBTITLE),
			buttonText: t(InterviewHistory.EMPTY_BUTTON),
			onClick: onMoveToInterview,
		},
	};

	return (
		<PageWrapper
			shouldVerify
			shouldPremium
			isLoading={isLoading}
			hasError={isError}
			hasFilters={Boolean(dateRange)}
			hasData={Boolean(data?.data?.length)}
			skeleton={<InterviewHistoryPageSkeleton />}
			stubs={stubs}
			content={
				<Flex gap="20">
					<FullPassedQuizzesList interviews={data?.data ?? []} onLoadNext={onLoadNext} />
					<EventCalendar onDateChange={onDateChange} selectedDates={dateRange} />
				</Flex>
			}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default InterviewHistoryPage;
