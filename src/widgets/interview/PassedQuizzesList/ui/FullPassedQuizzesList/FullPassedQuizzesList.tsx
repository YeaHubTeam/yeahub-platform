import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useAppSelector, useInfiniteScroll } from '@/shared/libs';
import { Value } from '@/shared/ui/Calendar';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';

import { getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery } from '@/entities/quiz';

import { FullPassedQuizzesItem } from '../FullPassedQuizzesItem/FullPassedQuizzesItem';

interface InterviewHistoryProps {
	dateRange?: Value;
	resetFilters?: () => void;
	onLoaded?: () => void;
}

export const FullPassedQuizzesList = ({
	dateRange,
	resetFilters,
	onLoaded,
}: InterviewHistoryProps) => {
	const [page, setPage] = useState(1);
	const [uniqueKey, setUniqueKey] = useState(Date.now().toString());

	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const profileId = useAppSelector(getProfileId);

	const { data, isLoading, isFetching, isSuccess } = useGetHistoryQuizQuery({
		profileId,
		page,
		startAfter: startAfter ? startAfter.toISOString() : undefined,
		startBefore: startBefore ? startBefore.toISOString() : undefined,
		uniqueKey: uniqueKey ?? 'interviewHistory',
	});

	const lastItemRef = useRef() as MutableRefObject<HTMLElement>;

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && data?.data && data.data.length < data?.total) {
			setPage(page + 1);
		}
	}, [isLoading, isFetching, page, data]);

	useInfiniteScroll({ callback: onLoadNext, lastItemRef });

	const isEmptyData = isSuccess && data?.data && data.data.length === 0;

	const refreshParams = useCallback(() => {
		setUniqueKey(Date.now().toString());
		setPage(1);
	}, []);

	useEffect(() => {
		if (dateRange) refreshParams();
	}, [dateRange, refreshParams]);

	useEffect(() => {
		isSuccess && onLoaded && onLoaded();
	}, [isSuccess, onLoaded]);

	if (isEmptyData) {
		return (
			<Card>
				<Stub type="filter-empty" onClick={resetFilters} />
			</Card>
		);
	}

	return (
		<Flex componentType="ul" direction="column" maxWidth gap="20">
			{data?.data?.map((interview, index) => (
				<FullPassedQuizzesItem
					key={interview.id}
					interview={interview}
					itemRef={data?.data.length === index + 1 ? lastItemRef : null}
				/>
			))}
		</Flex>
	);
};
