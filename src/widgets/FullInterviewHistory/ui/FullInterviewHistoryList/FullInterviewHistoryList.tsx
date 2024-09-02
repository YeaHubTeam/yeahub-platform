import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';
import { Loader } from '@/shared/ui/Loader';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

interface InterviewHistoryProps {
	dateRange?: Value;
}

export const FullInterviewHistoryList = ({ dateRange }: InterviewHistoryProps) => {
	const [page, setPage] = useState(1);

	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const { data, total, isLoading, isFetching, isSuccess } = useGetHistory({
		page,
		startAfter: startAfter ? startAfter.toISOString() : undefined,
		startBefore: startBefore ? startBefore.toISOString() : undefined,
	});

	const lastItemRef = useRef() as MutableRefObject<HTMLElement>;

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && data.length < total) {
			setPage(page + 1);
		}
	}, [isLoading, isFetching, page, total, data.length]);

	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	const isEmptyData = isSuccess && data.length === 0;

	return (
		<>
			{isLoading || isFetching ? <Loader /> : null}
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
