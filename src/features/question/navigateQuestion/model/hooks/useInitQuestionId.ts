import { useEffect, useState } from 'react';

import { getFromLS, removeFromLS, setToLS } from '@/shared/helpers/manageLocalStorage';

import { LS_INIT_QUESTION_ID, Question } from '@/entities/question';

export const useInitQuestionId = (questionId: number, questions: Question[]) => {
	const [initQuestionId, setInitQuestionId] = useState<number>(
		() => Number(getFromLS(LS_INIT_QUESTION_ID)) ?? 0,
	);

	const currentIndex = questions.findIndex((item) => item.id === questionId);

	useEffect(() => {
		if (!questions || !questions.length) return;

		if (currentIndex === -1 && initQuestionId === 0) {
			setToLS(LS_INIT_QUESTION_ID, questionId);
			setInitQuestionId(Number(questionId));
		}
	}, [questions]);

	useEffect(() => {
		return () => {
			removeFromLS(LS_INIT_QUESTION_ID);
		};
	}, []);

	return initQuestionId;
};
