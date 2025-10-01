import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { ReactIcon } from '@/shared/ui/Icons/ReactIcon';

import { StatusIcon } from '@storybook/icons';

import styles from './InterviewPopularQuestions.module.css';

interface InterviewPopularQuestionsProps {
	topStat: {
		title: string;
		frequencyStat: number;
	}[];
}

export const InterviewPopularQuestions = ({ topStat }: InterviewPopularQuestionsProps) => {
	return (
		<Card
			title={'Самые частые вопросы в подборках'}
			isActionPositionBottom={true}
			actionTitle={'Подробнее'}
			actionRoute={'_blank'}
			size={'medium'}
		>
			<Flex direction="column" gap={'24'}>
				{topStat.map((item, index) => (
					<Flex className={styles.item} key={index} direction={'row'} gap={'12'}>
						<div className={styles.icon}>
							<ReactIcon />
						</div>

						<Flex direction={'column'} gap={'4'}>
							<Flex direction={'row'} gap={'4'} align={'center'}>
								<StatusIcon color={'blue'}></StatusIcon>
								<Text variant={'head5'}>{`${item.title}`}</Text>
							</Flex>

							<Flex direction={'row'} align={'center'} gap={'8'}>
								<Text variant={'body2'} className={styles.populariry}>
									Популярность:
								</Text>

								<div className={styles.freq}>
									<Text variant={'body1-accent'} color={'white-900'}>
										{item.frequencyStat}%
									</Text>
								</div>
							</Flex>
						</Flex>
					</Flex>
				))}
			</Flex>
		</Card>
	);
};
