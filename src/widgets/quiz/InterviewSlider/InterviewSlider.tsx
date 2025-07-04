import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { InterviewQuiz } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getProfileId } from '@/entities/profile';
import { useGetQuestionByIdQuery } from '@/entities/question';
import { QuizQuestionAnswerType } from '@/entities/quiz/model/types/quiz';
import { ResponseButtons } from '@/entities/quiz/ui/ResponseButtons/ResponseButtons';

import { FavoriteQuestionButton } from '@/features/question/favoriteQuestion';

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
	const { t } = useTranslation(i18Namespace.interviewQuiz);

	const onToggleAnswerVisibility = () => {
		setIsAnswerVisible(!isAnswerVisible);
	};

	const profileId = useAppSelector(getProfileId);
	const { data } = useGetQuestionByIdQuery({ questionId: `${id}`, profileId: profileId });
	const isFavorite = data?.isFavorite;

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
					<button className={styles.answer} onClick={onToggleAnswerVisibility}>
						{t(InterviewQuiz.ANSWER_SHOW)}
					</button>
				) : (
					<Flex direction="column" gap="16" className={styles['answer-wrapper']}>
						<TextHtml html={shortAnswer} />
						<button className={styles.answer} onClick={onToggleAnswerVisibility}>
							{t(InterviewQuiz.ANSWER_HIDE)}
						</button>
					</Flex>
				)}
			</div>
			<ResponseButtons
				className={styles['response-buttons']}
				answer={answer}
				changeAnswer={changeAnswer}
				favoriteButton={
					<FavoriteQuestionButton questionId={id} size={'small'} isFavorite={isFavorite} />
				}
			/>
			{imageSrc && <ImageWithWrapper src={imageSrc} alt={title} className={styles.image} />}
		</article>
	);
};
