import { useState } from 'react';

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
		<article key={id} className={styles['slider-tmp']}>
			<div className={styles['content-wrapper']}>
				<p className={styles['question-tmp']}>{title}</p>
				<div className={styles.wrapper}>
					{!isAnswerVisible ? (
						<button className={styles.answer} onClick={toggleAnswerVisibility}>
							Посмотреть ответ
						</button>
					) : (
						shortAnswer
					)}
				</div>
				<ResponseButtons
					className={styles['response-buttons-tmp']}
					answer={answer}
					changeAnswer={changeAnswer}
				/>
			</div>
			<div className={styles['image-wrapper']}>
				{imageSrc && (
					<ImageWithWrapper src={imageSrc} alt={title} className={styles['image-tmp']} />
				)}
			</div>
		</article>
	);
};
