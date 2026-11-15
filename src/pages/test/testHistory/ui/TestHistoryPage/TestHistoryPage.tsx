import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, TestHistory, ROUTES } from '@/shared/config';
import { EventCalendar, Value } from '@/shared/ui/Calendar';
import { Flex } from '@/shared/ui/Flex';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { FullPassedTestsList } from '@/widgets/test/PassedTestsList';

import { useTestHistoryData } from '../../model/hooks/useTestHistoryData';
import { getTestHistoryPageDateRange } from '../../model/selectors/TestHistoryPageSelectors';
import { testHistoryPageActions } from '../../model/slices/TestHistoryPageSlice';

import style from './TestHistoryPage.module.css';
import { TestHistoryPageSkeleton } from './TestHistoryPage.skeleton';

const TestHistoryPage = () => {
	const [selectedDates, setSelectedDates] = useState<Value>(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const dateRange = useSelector(getTestHistoryPageDateRange);
	const { data, isLoading, isError, refetch, onLoadNext } = useTestHistoryData(dateRange);
	const { t } = useTranslation(i18Namespace.testHistory);

	const hasFilters = selectedDates !== null;

	const onDateChange = (dates: Value) => {
		setSelectedDates(dates);
		dispatch(testHistoryPageActions.setDateRange(dates));
	};

	const onResetFilters = () => {
		setSelectedDates(null);
		dispatch(testHistoryPageActions.resetDateRange());
	};

	const onMoveToTest = () => {
		navigate(ROUTES.test.page);
	};

	useEffect(() => {
		return () => {
			dispatch(testHistoryPageActions.resetDateRange());
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
			title: t(TestHistory.STUB_EMPTY_TITLE),
			subtitle: t(TestHistory.STUB_EMPTY_SUBTITLE),
			buttonText: t(TestHistory.STUB_EMPTY_BUTTON),
			onClick: onMoveToTest,
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
			skeleton={<TestHistoryPageSkeleton />}
			content={
				<div className={classNames(style['container-list'])}>
					<FullPassedTestsList data={data ?? []} onLoadNext={onLoadNext} />
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

export default TestHistoryPage;
