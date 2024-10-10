import classNames from 'classnames';
import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { TextHtml } from '@/shared/TextHtml/TextHtml';
import { Flex } from '@/shared/ui/Flex';
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

	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	const toggleAnswerVisibility = () => {
		setIsAnswerVisible((prev) => !prev);
	};

	return (
		<article
			key={id}
			className={classNames(styles.slider, {
				[styles['slider-with-image']]: !!imageSrc,
				[styles['slider-without-image']]: !imageSrc,
			})}
		>
			<p className={styles.question}>{title}</p>
			<div className={styles.wrapper}>
				{!isAnswerVisible ? (
					<button className={styles.answer} onClick={toggleAnswerVisibility}>
						Посмотреть ответ
					</button>
				) : (
					<Flex direction="column" gap="16" className={styles['answer-wrapper']}>
						<TextHtml html={shortAnswer} />
						<button className={styles.answer} onClick={toggleAnswerVisibility}>
							{t(InterviewQuiz.QUESTIONS_HIDEANSWER)}
						</button>
					</Flex>
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
