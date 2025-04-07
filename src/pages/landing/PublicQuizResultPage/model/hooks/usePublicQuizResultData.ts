import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getJSONFromLS, removeFromLS } from '@/shared/helpers/manageLocalStorage';

import { Answers, LS_ACTIVE_MOCK_QUIZ_KEY } from '@/entities/quiz';

export const usePublicQuizResultData = () => {
	const [quizAnswers, setQuizAnswers] = useState<Answers[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		try {
			const data = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
			if (!data) {
				navigate('/');
				return;
			}
			const answers = data?.response?.answers;
			if (!Array.isArray(answers)) {
				throw new Error('Invalid format of questions data in localStorage');
			}
			setQuizAnswers(answers);
			timer = setTimeout(() => setIsLoading(false), 800);
		} catch (error) {
			console.error('Failed to load questions from localStorage:', error);
			navigate('/');
			setIsLoading(false);
		}

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		return () => removeFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
	}, []);

	return { quizAnswers, isLoading };
};
