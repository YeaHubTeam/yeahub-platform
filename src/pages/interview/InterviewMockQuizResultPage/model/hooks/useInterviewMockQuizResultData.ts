import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getJSONFromLS } from '@/shared/helpers/manageLocalStorage';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { getProfileId } from '@/entities/profile';
import { Answers, clearActiveMockQuizState, LS_ACTIVE_MOCK_QUIZ_KEY } from '@/entities/quiz';

export const useInterviewMockQuizResultData = () => {
	const [quizAnswers, setQuizAnswers] = useState<Answers[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const profileId = useAppSelector(getProfileId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		try {
			const data = getJSONFromLS(LS_ACTIVE_MOCK_QUIZ_KEY);
			if (!data) {
				navigate('/');
				return;
			}
			const answers = data?.[profileId];
			if (!Array.isArray(answers)) {
				throw new Error('Invalid format of questions data in localStorage');
			}
			setQuizAnswers(answers);
			timer = setTimeout(() => setIsLoading(false), 800);
		} catch (error) {
			console.error('Failed to load questions from localStorage:', error);
			navigate('/dashboard');
			setIsLoading(false);
		}

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		return () => {
			dispatch(clearActiveMockQuizState({ profileId, shouldClearLS: true }));
		};
	}, []);

	return { quizAnswers, isLoading };
};
