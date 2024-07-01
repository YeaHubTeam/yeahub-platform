import { useState } from 'react';

import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { ResponseButtons } from '../ResponseButtons/ResponseButtons';

import styles from './InterviewSlider.module.css';

interface Props {
	id: number;
	title: string;
	imageSrc?: string;
	longAnswer: string;
}

export const InterviewSlider = ({ id, title, imageSrc, longAnswer }: Props) => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);

	const toggleAnswerVisibility = () => {
		setIsAnswerVisible((prev) => !prev);
	};

	return (
		<article key={id} className={styles.slider}>
			<div className={styles.wrapper}>
				<p className={styles.question}>{title}</p>
				{!isAnswerVisible ? (
					<button className={styles.answer} onClick={toggleAnswerVisibility}>
						Посмотреть ответ
					</button>
				) : (
					<div>{longAnswer}</div>
				)}
				<ResponseButtons className={styles['response-buttons']} />
			</div>
			<ImageWithWrapper src={imageSrc} alt={title} className={styles.image} />
		</article>
	);
};
