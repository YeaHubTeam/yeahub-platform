import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';
import { Card } from '@/shared/ui/Card';
import { EmptyStub } from '@/shared/ui/EmptyStub';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

interface InterviewHistoryProps {
	dateRange?: Value;
	resetFilters?: () => void;
	onLoaded?: () => void;
}

export const FullInterviewHistoryList = ({
	dateRange,
	resetFilters,
	onLoaded,
}: InterviewHistoryProps) => {
	const [page, setPage] = useState(1);
	const [uniqueKey, setUniqueKey] = useState(Date.now().toString());

	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const { data, total, isLoading, isFetching, isSuccess } = useGetHistory(
		{
			page,
			startAfter: startAfter ? startAfter.toISOString() : undefined,
			startBefore: startBefore ? startBefore.toISOString() : undefined,
		},
		uniqueKey,
	);

	const lastItemRef = useRef() as MutableRefObject<HTMLElement>;

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && data.length < total) {
			setPage(page + 1);
		}
	}, [isLoading, isFetching, page, total, data.length]);

	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	const isEmptyData = isSuccess && data.length === 0;

	const refreshParams = useCallback(() => {
		setUniqueKey(Date.now().toString());
		setPage(1);
	}, []);

	useEffect(() => {
		if (dateRange) refreshParams();
	}, [dateRange, refreshParams]);

	useEffect(() => {
		isSuccess && onLoaded && onLoaded();
	}, [isSuccess]);

	return !isEmptyData ? (
		<ul className={styles.list}>
			{data.map((interview, index) => (
				<FullInterviewHistoryItem
					key={interview.id}
					interview={interview}
					itemRef={data.length === index + 1 ? lastItemRef : null}
				/>
			))}
		</ul>
	) : (
		<Card className={styles['empty-container']}>
			<EmptyStub resetFilters={resetFilters} />
		</Card>
	);
};
