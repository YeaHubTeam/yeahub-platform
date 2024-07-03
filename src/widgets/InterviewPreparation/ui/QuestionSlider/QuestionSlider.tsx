import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';

import { INTERVIEW_QUESTIONS } from '@/entities/interview';
import { useSlideSwitcher } from '@/entities/interview';
import { QuestionNavPanel } from '@/entities/interview';

import styles from './QuestionSlider.module.css';

export const QuestionSlider = () => {
	const { title, imageSrc, goToNextSlide, goToPrevSlide } = useSlideSwitcher(INTERVIEW_QUESTIONS);

	return (
		<>
			<div className={styles.question}>
				<h2>{title}</h2>
				<ImageWithWrapper src={imageSrc} alt={title} className={styles['image-wrapper']} />
			</div>
			<QuestionNavPanel goToNextSlide={goToNextSlide} goToPrevSlide={goToPrevSlide} />
		</>
	);
};
