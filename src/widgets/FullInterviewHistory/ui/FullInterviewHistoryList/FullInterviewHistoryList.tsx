import { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeList as ReactWindowFullHistoryList } from 'react-window';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useWindowSize } from '@/shared/hooks/useWindowSize';
import { Value } from '@/shared/ui/Calendar/ui/EventCalendar';
import { Loader } from '@/shared/ui/Loader';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

interface InterviewHistoryProps {
	dateRange?: Value;
}

interface ReactWindowRowProps {
	index: number;
	style: React.CSSProperties;
}

// We need to change this values to other sizes of screens
const ITEM_HEIGHT = 290;
const CALENDAR_GAP = 20;
const CALENDAR_WIDTH = 360;

const calcListWidth = (width: number) => {
	return width - CALENDAR_WIDTH - CALENDAR_GAP;
};
//

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

	const lastItemRef = useRef<HTMLLIElement | null>(null);

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && data.length < total) {
			setPage(page + 1);
		}
	}, [isLoading, isFetching, page, total, data.length]);

	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	const isDataEmpty = isSuccess && data.length === 0;

	const refreshParams = useCallback(() => {
		setUniqueKey(Date.now().toString());
		setPage(1);
	}, []);

	useEffect(() => {
		if (dateRange) refreshParams();
	}, [dateRange, refreshParams]);

	const { width: windowWidth, height: windowHeight } = useWindowSize();

	return (
		<>
			{isLoading || isFetching ? <Loader /> : null}
			{isDataEmpty ? (
				<p>Нет данных</p>
			) : (
				<ReactWindowFullHistoryList
					className={styles.list}
					itemSize={ITEM_HEIGHT}
					itemCount={data.length}
					height={windowHeight}
					width={calcListWidth(windowWidth)}
				>
					{({ index, style }: ReactWindowRowProps) => (
						<FullInterviewHistoryItem
							key={data[index].id}
							style={style}
							interview={data[index]}
							ref={data.length === index + 1 && lastItemRef?.current ? lastItemRef : null}
						/>
					)}
				</ReactWindowFullHistoryList>
			)}
		</>
	);
};
