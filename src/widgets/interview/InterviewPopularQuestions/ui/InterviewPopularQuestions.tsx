import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';
import { ReactIcon } from '@/shared/ui/Icons/ReactIcon';
import { Link } from 'react-router-dom';
import { GradeChip } from '@/shared/ui/GradeChip';
import { InterviewQuizResult } from '@/shared/config/i18n/i18nTranslations';
import styles from './InterviewPopularQuestions.module.css';

import { useTranslation } from 'react-i18next';
import { i18Namespace } from '@/shared/config/i18n';

interface InterviewPopularQuestionsProps {
	topStat: {
		questionId: number;
		title: string;
		frequencyStat: number;
	}[];
}

const popularQuestions: InterviewPopularQuestionsProps = [
	{
		questionId: 1,
		title: 'Что такое Virtual DOM, и как он работает?',
		frequencyStat: 82,
	},
	{
		questionId: 2,
		title: 'Что такое Virtual DOM, и как он работает?',
		frequencyStat: 72,
	},
	{
		questionId: 3,
		title: 'Что такое Virtual DOM, и как он работает?',
		frequencyStat: 62,
	},
];

export const InterviewPopularQuestions = () => {
	const { t } = useTranslation(i18Namespace.interviewQuizResult);
	return (
		<Card
			isActionPositionBottom
			withOutsideShadow
			title={t(InterviewQuizResult.TITLE_QUESTIONS_LIST)}
			actionTitle={'Подробнее'}
			actionRoute={'_blank'}
			size={'small'}
		>
			<Flex direction="column" gap={'24'}>
				{popularQuestions.map((item) => (
					<Card withOutsideShadow size="small" key={item.questionId}>
						<Link to={'_blank'} className={styles.link}>
							<Flex className={styles.image}>
								<ReactIcon />
							</Flex>
							<Flex direction="column" gap="8" justify={'center'} align={'start'}>
								<Text variant="body3-accent" maxRows={1} className={styles.title}>
									{/*{t(InterviewStatistics.QUESTION_STATS_TITLE_SHORT)}*/}
									{item.title}
								</Text>
								<Flex className={styles.populariry}>
									<GradeChip label={'популярность'} value={item.frequencyStat} size="small" />
								</Flex>
							</Flex>
						</Link>
					</Card>
				))}
			</Flex>
		</Card>
	);
};
