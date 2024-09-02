import { MutableRefObject, useCallback, useRef, useState } from 'react';

import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { Loader } from '@/shared/ui/Loader';

import { FullInterviewHistoryItem } from '../FullInterviewHistoryItem/FullInterviewHistoryItem';

import styles from './FullInterviewHistoryList.module.css';
import { useGetHistory } from './model/hooks/useGetHistory';

export const FullInterviewHistoryList = () => {
	const [page, setPage] = useState(1);
	const { data, total, isLoading, isFetching, isSuccess } = useGetHistory({
		page,
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
