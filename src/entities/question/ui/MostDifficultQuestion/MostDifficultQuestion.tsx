import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar, ProgressBarColor } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { TopStat } from '../../model/types/question';

import styles from './MostDifficultQuestion.module.css';

const getProgressColor = (percent: number): ProgressBarColor => {
	if (percent < 50) return 'green';
	if (percent < 80) return 'yellow';
	return 'red';
};

interface MostDifficultQuestionProps {
	question: TopStat;
}

const MostDifficultQuestion = ({ question }: MostDifficultQuestionProps) => {
	return (
		<Card key={question.questionId} withOutsideShadow size={'small'} className={styles['card']}>
			<Flex justify={'between'}>
				<Text maxRows={1} variant={'body3-accent'} className={styles.question}>
					{question.title}
				</Text>
				<Text variant={'body3-accent'} className={styles.percent}>
					{question.answersCount}%
				</Text>
			</Flex>
			<ProgressBar
				currentCount={question.answersCount}
				totalCount={100}
				variant={'medium'}
				color={getProgressColor(question.answersCount)}
				className={styles['progress-bar']}
			/>
		</Card>
	);
};

export default MostDifficultQuestion;
