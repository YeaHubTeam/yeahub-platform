import { skipToken } from '@reduxjs/toolkit/query';

import { useGetProfileQuery } from '@/entities/auth';
import { useGetHistoryQuizByIdQuery } from '@/entities/quiz';
import type { QuizHistoryParams } from '@/entities/quiz';

/*
TODO: refresh запрос срабатывает какждый раз, при обновлении страницы,
потому что acessToken сетается в редакс, соответственно если обновить страницу
interviewHistory, запрос скипнется на получение данных,надо между роутами походить
*/

export const useGetHistory = (params?: QuizHistoryParams) => {
	const profile = useGetProfileQuery();

	const profileId = profile.data?.profiles[0].profileId;

	const historyQuiz = useGetHistoryQuizByIdQuery(
		profileId
			? {
					profileID: profileId,
					params: { ...params },
				}
			: skipToken,
	);

	return {
		...historyQuiz,
		data: historyQuiz.data?.data || [],
	};
};
