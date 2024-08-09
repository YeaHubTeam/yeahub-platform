import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { QUIZ_QUESTIONS, QuestionNavPanel, useSlideSwitcher } from '@/entities/quiz';

import styles from './QuestionSlider.module.css';

export const QuestionSlider = () => {
	const { questionTitle, imageSrc, goToNextSlide, goToPrevSlide } =
		useSlideSwitcher(QUIZ_QUESTIONS);

	return (
		<>
			<div className={styles.question}>
				<h2>{questionTitle}</h2>
				<ImageWithWrapper src={imageSrc} alt={questionTitle} className={styles['image-wrapper']} />
			</div>
			<QuestionNavPanel goToNextSlide={goToNextSlide} goToPrevSlide={goToPrevSlide} />
		</>
	);
};
