import { useState } from 'react';

import { TextHtml } from '@/shared/TextHtml/TextHtml';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { QuizQuestionAnswerType } from '../../model/types/quiz';
import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './InterviewSlider.module.css';

interface InterviewSliderProps {
	id: number;
	title: string;
	imageSrc?: string;
	shortAnswer: string;
	answer: string;
	changeAnswer: (answer: QuizQuestionAnswerType) => void;
}

export const InterviewSlider = ({
	id,
	title,
	imageSrc,
	answer,
	shortAnswer,
	changeAnswer,
}: InterviewSliderProps) => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	const toggleAnswerVisibility = () => {
		setIsAnswerVisible((prev) => !prev);
	};

	return (
		<article key={id} className={styles.slider}>
			<p className={styles.question}>{title}</p>
			<div className={styles.wrapper}>
				{!isAnswerVisible ? (
					<button className={styles.answer} onClick={toggleAnswerVisibility}>
						Посмотреть ответ
					</button>
				) : (
					<TextHtml html={shortAnswer}></TextHtml>
				)}
			</div>
			<ResponseButtons
				className={styles['response-buttons']}
				answer={answer}
				changeAnswer={changeAnswer}
			/>
			{imageSrc && <ImageWithWrapper src={imageSrc} alt={title} className={styles.image} />}
		</article>
	);
};
