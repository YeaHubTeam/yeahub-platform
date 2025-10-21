import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

import { PopularQuestionStat } from '../../model/types/question';

import styles from './PopularQuestion.module.css';

interface PopularQuestionProps {
	question: PopularQuestionStat;
}

export const PopularQuestion = ({ question }: PopularQuestionProps) => {
	return (
		<Card className={styles['question-card']} withOutsideShadow size="small">
			<div className={styles['question-content']}>
				<div className={styles['image-container']}>
					<img src={question.imageSrc} alt="img" />
				</div>
				<div className={styles.questionInfo}>
					<div className={styles['question-text']}>
						<span className={styles.bullet}>•</span>
						<Text variant="body3-strong">{question.title}</Text>
					</div>
					<div className={styles['popularity-container']}>
						<Text variant="body2" color="black-800">
							Популярность:
						</Text>
						<div className={styles['popularity-badge']}>
							<Text variant="body1" color="white-900">
								{question.frequencyStat}%
							</Text>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
