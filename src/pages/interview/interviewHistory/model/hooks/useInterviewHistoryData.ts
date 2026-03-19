import { useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '@/shared/libs';
import { Value } from '@/shared/ui/Calendar';

import { getProfileId } from '@/entities/profile';
import { useGetHistoryQuizQuery, QuizWithoutQuestions } from '@/entities/quiz';

interface UseInterviewHistoryDataReturn {
	data: QuizWithoutQuestions[] | undefined;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
	onLoadNext: () => void;
}

export const useInterviewHistoryData = (dateRange: Value): UseInterviewHistoryDataReturn => {
	const [page, setPage] = useState(1);
	const [uniqueKey, setUniqueKey] = useState(Date.now().toString());

	const startAfter = Array.isArray(dateRange) ? dateRange[0] : dateRange;
	const startBefore = Array.isArray(dateRange) ? dateRange[1] : dateRange;

	const profileId = useAppSelector(getProfileId);

	const { data, isLoading, isFetching, isError, refetch } = useGetHistoryQuizQuery({
		profileId,
		page,
		startAfter: startAfter ? startAfter.toISOString() : undefined,
		startBefore: startBefore ? startBefore.toISOString() : undefined,
		uniqueKey: uniqueKey ?? 'interviewHistory',
	});

	const onLoadNext = useCallback(() => {
		if (!isLoading && !isFetching && data?.data && data.data.length < data?.total) {
			setPage(page + 1);
		}
	}, [isLoading, isFetching, page, data]);

	const refreshParams = useCallback(() => {
		setUniqueKey(Date.now().toString());
		setPage(1);
	}, []);

	useEffect(() => {
		if (dateRange) refreshParams();
	}, [dateRange, refreshParams]);

	return {
		data: data?.data,
		isLoading: isLoading || isFetching,
		isError,
		refetch,
		onLoadNext,
	};
};
