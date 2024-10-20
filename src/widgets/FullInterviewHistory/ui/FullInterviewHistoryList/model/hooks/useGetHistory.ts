import { skipToken } from '@reduxjs/toolkit/query';

import { useProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizQuery, type QuizHistoryParams } from '@/entities/quiz';

/*
TODO: refresh запрос срабатывает какждый раз, при обновлении страницы,
потому что acessToken сетается в редакс, соответственно если обновить страницу
interviewHistory, запрос скипнется на получение данных,надо между роутами походить
*/

export const useGetHistory = (
	params?: QuizHistoryParams,
	uniqueKey: string = 'interviewHistory',
) => {
	const profile = useProfileQuery();

	const profileId = profile.data?.profiles[0].id;

	const historyQuiz = useGetHistoryQuizQuery(
		profileId
			? {
					profileID: profileId,
					params: { ...params },
					//have to pass uniqueKey to force query to refetch data after merging
					uniqueKey,
				}
			: skipToken,
	);

	return {
		...historyQuiz,
		data: historyQuiz.data?.data || [],
		total: historyQuiz.data?.total || 0,
	};
};
