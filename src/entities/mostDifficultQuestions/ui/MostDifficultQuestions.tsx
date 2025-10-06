import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '../api/mostDifficultQuestionsApi';

import styles from './MostDifficultQuestions.module.css';

export const MostDifficultQuestions = () => {
	const { data: difficultQuestions } = useGetMostDifficultQuestionsBySpecializationIdQuery({
		specId: 4,
	});
	const { isSmallScreen } = useScreenSize();

	const progressBarColors = ['green', 'yellow', 'red'] as const;

	// const mixedQuestions = difficultQuestions?.topStat.sort(() => Math.random() - 0.5);

	const filteredQuestions = isSmallScreen
		? difficultQuestions?.topStat.slice(3)
		: difficultQuestions?.topStat.slice(0, 6);

	return (
		<Flex direction="column" gap="12">
			{filteredQuestions?.map((question, index) => {
				const color = progressBarColors[index % progressBarColors.length];
				return (
					<Card
						key={question.questionId}
						withOutsideShadow
						size={'small'}
						className={styles['card']}
					>
						<Flex justify={'between'}>
							<p className={styles.question}>
								<span>{question.title}</span>
							</p>
							<div className={styles.percent}>{question.answersCount}%</div>
						</Flex>
						<ProgressBar
							currentCount={question.answersCount}
							totalCount={100}
							variant={'colored'}
							color={color}
							className={styles['progress-bar']}
						/>
					</Card>
				);
			})}
		</Flex>
	);
};
