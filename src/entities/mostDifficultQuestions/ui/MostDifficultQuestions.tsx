import { useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBar } from '@/shared/ui/ProgressBar';

import { useGetMostDifficultQuestionsQuery } from '../api/mostDifficultQuestionsApi';

import styles from './MostDifficultQuestions.module.css';

export const MostDifficultQuestions = () => {
	const { data: difficultQuestions } = useGetMostDifficultQuestionsQuery({ specId: 4 });
	const progressBarColors = ['green', 'yellow', 'red'] as const;
	const { isSmallScreen } = useScreenSize();
	const smallScreenQuestions = difficultQuestions?.slice(3);

	return (
		<Flex direction="column" gap="12">
			{(isSmallScreen ? smallScreenQuestions : difficultQuestions)?.map((question, index) => {
				const color = progressBarColors[index % progressBarColors.length];
				return (
					<Card key={question.id} withOutsideShadow size={'small'} className={styles['inner-card']}>
						<Flex justify={'between'}>
							<p className={styles.question}>
								<span>{question.topStat.title}</span>
							</p>
							<div className={styles.percent}>{question.topStat.answersCount}%</div>
						</Flex>
						<ProgressBar
							currentCount={question.topStat.answersCount}
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
