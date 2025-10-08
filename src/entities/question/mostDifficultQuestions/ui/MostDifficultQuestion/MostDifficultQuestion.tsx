import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';
import { Text } from '@/shared/ui/Text';

import { TopStat } from '../../model/types/difficultQuestions';

import styles from './MostDifficultQuestion.module.css';

interface Props {
	questions?: TopStat[];
}

const MostDifficultQuestion = ({ questions }: Props) => {
	return (
		<>
			{questions?.map((question) => (
				<Card key={question.questionId} withOutsideShadow size={'small'} className={styles['card']}>
					<Flex justify={'between'}>
						<Text variant={'body3-accent'} className={styles.question}>
							<span>{question.title}</span>
						</Text>
						<Text variant={'body3-accent'} className={styles.percent}>
							{question.answersCount}%
						</Text>
					</Flex>
					<ProgressBar
						currentCount={question.answersCount}
						totalCount={100}
						variant={'medium'}
						className={styles['progress-bar']}
					/>
				</Card>
			))}
		</>
	);
};

export default MostDifficultQuestion;
