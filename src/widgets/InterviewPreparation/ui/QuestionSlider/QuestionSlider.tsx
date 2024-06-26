import { useState } from 'react';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { INTERVIEW_QUESTIONS } from '@/entities/interview';
import { QuestionNavPanel } from '@/entities/interview';

import styles from './QuestionSlider.module.css';

export const QuestionSlider = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);

	const { title, imageSrc } = INTERVIEW_QUESTIONS[currentQuestion];

	const goToNextQuestion = () => {
		setCurrentQuestion((prev) => (prev === INTERVIEW_QUESTIONS.length - 1 ? 0 : prev + 1));
	};

	const goToPrevQuestion = () => {
		setCurrentQuestion((prev) => (prev === 0 ? INTERVIEW_QUESTIONS.length - 1 : prev - 1));
	};

	return (
		<>
			<div className={styles.question}>
				<h2>{title}</h2>
				<ImageWithWrapper src={imageSrc} alt={title} className={styles['image-wrapper']} />
			</div>
			<QuestionNavPanel goToNextQuestion={goToNextQuestion} goToPrevQuestion={goToPrevQuestion} />
		</>
	);
};
