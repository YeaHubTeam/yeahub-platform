import { useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

// eslint-disable-next-line
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getHasPremiumAccess, getProfileId } from '@/entities/profile';

import { changeQuestionAnswer } from '../model/slices/activeQuizSlice';
import { Answers, QuizQuestionAnswerType } from '../model/types/quiz';

export const useSlideSwitcher = (questions: Answers[]) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const dispatch = useAppDispatch();
	const profileId = useAppSelector(getProfileId);
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const location = useLocation();

	const answeredCount = questions.filter((question) => question.answer !== undefined).length;
	const isAuthRoute = !!matchPath('/dashboard/interview/new', location.pathname);

	const changeAnswer = (answer: QuizQuestionAnswerType) => {
		dispatch(
			changeQuestionAnswer({
				questionId: questions[currentQuestion].questionId,
				answer,
				shouldSaveToLS: isAuthRoute,
				profileId,
				hasPremium,
			}),
		);
	};

	const goToNextSlide = () => {
		setCurrentQuestion((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
	};

	const goToPrevSlide = () => {
		setCurrentQuestion((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
	};

	return {
		...questions[currentQuestion],
		totalCount: questions.length,
		activeQuestion: currentQuestion + 1,
		answeredCount,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	};
};
