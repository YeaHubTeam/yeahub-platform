import { useState } from 'react';

// eslint-disable-next-line
import { useAppDispatch } from '@/shared/hooks';

import { changeQuestionAnswer } from '../model/slices/activeQuizSlice';
import { Answers, QuizQuestionAnswerType } from '../model/types/quiz';

export const useSlideSwitcher = (questions: Answers[]) => {
	const dispatch = useAppDispatch();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const currentCount = questions.filter((question) => Boolean(question.answer)).length;

	const changeAnswer = (answer: QuizQuestionAnswerType) => {
		dispatch(
			changeQuestionAnswer({
				questionId: questions[currentQuestion].questionId,
				answer,
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
		currentCount,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	};
};
