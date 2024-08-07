import { useState } from 'react';

// eslint-disable-next-line
import { Answers } from '@/entities/quiz';

export const useSlideSwitcher = (questions: Answers[]) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const goToNextSlide = () => {
		setCurrentQuestion((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
	};

	const goToPrevSlide = () => {
		setCurrentQuestion((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
	};

	return {
		...questions[currentQuestion],
		goToNextSlide,
		goToPrevSlide,
	};
};
