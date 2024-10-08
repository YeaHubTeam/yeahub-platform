import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

interface InterviewHistoryProps {
	dateRange?: Value;
}

export const FullInterviewHistoryList = ({ dateRange }: InterviewHistoryProps) => {
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

	return (
		<>
			{!isEmptyData ? (
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
				<p>Данных нет</p>
			)}
		</>
	);
};
