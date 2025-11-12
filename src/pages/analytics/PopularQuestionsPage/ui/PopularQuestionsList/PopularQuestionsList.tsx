import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Analytics } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapper } from '@/shared/ui/ImageWithWrapper';
import { Text } from '@/shared/ui/Text';

import { PopularQuestionStat } from '@/entities/question';

import styles from './PopularQuestionsList.module.css';

type PopularQuestionsListProps = {
	popularQuestions: PopularQuestionStat[];
};

export const PopularQuestionsList = ({ popularQuestions }: PopularQuestionsListProps) => {
	const { t } = useTranslation(i18Namespace.analytics);

	return (
		<ul className={styles['popular-questions']}>
			{popularQuestions.map((popularQuestion) => (
				<li key={popularQuestion.id}>
					<Card className={styles.card}>
						<Flex gap="12" direction="column" className={styles['learned-question']}>
							<Flex>
								<ImageWithWrapper src={popularQuestion.imageSrc} className={styles.icon} />
							</Flex>
							<Text variant={'body3-accent'}>{popularQuestion.title}</Text>
							<Flex justify="between">
								<Text variant={'body3-accent'}>
									{t(Analytics.POPULAR_QUESTIONS_COLUMNS_MOBILE_ANSWER)}
								</Text>
								<Text variant={'body3-accent'}>{`${popularQuestion.frequencyStat}%`}</Text>
							</Flex>
						</Flex>
					</Card>
				</li>
			))}
		</ul>
	);
};
