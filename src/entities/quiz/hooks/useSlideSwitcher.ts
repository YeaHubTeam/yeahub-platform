import { useState } from 'react';

// eslint-disable-next-line
import { setQuizzes } from '../model/slices/activeQuizzesSlice';
import { Answers } from '../model/types/quiz';

export const useSlideSwitcher = (questions: Answers[]) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const currentCount = questions.filter((question) => question.answer !== '').length;

	const changeAnswer = (answer: string) => {
		setQuizzes(
			questions.map((quiz) => {
				if (quiz.questionId === questions[currentQuestion].questionId) {
					return { ...quiz, answer };
				}
				return quiz;
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
		currentCount,
		changeAnswer,
		goToNextSlide,
		goToPrevSlide,
	};
};
