import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
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
	isAnswerVisible: boolean;
	setIsAnswerVisible: (value: boolean) => void;
}

export const InterviewSlider = ({
	id,
	title,
	imageSrc,
	answer,
	shortAnswer,
	changeAnswer,
	isAnswerVisible,
	setIsAnswerVisible,
}: InterviewSliderProps) => {
	const toggleAnswerVisibility = () => {
		setIsAnswerVisible(!isAnswerVisible);
	};
	const { t } = useI18nHelpers(i18Namespace.interviewQuiz);

	return (
		<article key={id} className={styles.slider}>
			<p className={styles.question}>{title}</p>
			<div className={styles.wrapper}>
				{!isAnswerVisible ? (
					<button className={styles.answer} onClick={toggleAnswerVisibility}>
						{t('showAnswer')}
					</button>
				) : (
					shortAnswer
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
