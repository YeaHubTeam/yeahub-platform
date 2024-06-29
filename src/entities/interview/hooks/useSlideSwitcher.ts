import { useState } from 'react';

export interface Question {
	id: number;
	title: string;
	description: string;
	keywords: string[];
	shortAnswer: string;
	longAnswer: string;
	status: string;
	rate: number;
	rating: number;
	specializations: number[];
	skills: number[];
	imageSrc?: string;
}

export const useSlideSwitcher = (questions: Question[]) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const {
		id,
		title,
		description,
		keywords,
		shortAnswer,
		longAnswer,
		status,
		rate,
		rating,
		specializations,
		skills,
		imageSrc,
	} = questions[currentQuestion];

	const goToNextSlide = () => {
		setCurrentQuestion((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
	};

	const goToPrevSlide = () => {
		setCurrentQuestion((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
	};

	return {
		currentQuestion,
		id,
		title,
		description,
		keywords,
		shortAnswer,
		longAnswer,
		status,
		rate,
		rating,
		specializations,
		skills,
		imageSrc,
		goToNextSlide,
		goToPrevSlide,
	};
};
