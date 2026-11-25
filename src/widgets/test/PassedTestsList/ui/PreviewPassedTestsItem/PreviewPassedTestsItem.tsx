import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { i18Namespace, TestHistory, ROUTES } from '@/shared/config';
import { formatDate, route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TestHistoryItem } from '@/entities/test';

import { TestResults } from '../TestResults/TestResults';

import styles from './PreviewPassedTestsItem.module.css';

interface PreviewPassedTestsItemProps {
	test: TestHistoryItem;
}

export const PreviewPassedTestsItem = ({ test }: PreviewPassedTestsItemProps) => {
	const { t } = useTranslation(i18Namespace.testHistory);
	const { id, successCount, fullCount } = test;
	const incorrectAnswersCount = fullCount - successCount;
	const formattedDate = formatDate(parseISO(test.endDate));

	return (
		<li>
			<Card withOutsideShadow size="small">
				<Link to={route(ROUTES.testing.history.result.page, id)} className={styles.link}>
					<Text variant="body3-accent" color="black-500" className={styles.date}>
						{formattedDate}
					</Text>
					<Flex wrap="wrap" justify="between" gap="14" className={styles.info}>
						<Text variant="body3-accent">
							{t(TestHistory.TEST_TITLE, { number: test.testNumber })}
						</Text>
						<Flex componentType="ul" gap="24">
							<TestResults
								label={t(TestHistory.RESULT)}
								correctAnswersCount={successCount}
								incorrectAnswersCount={incorrectAnswersCount}
							/>
						</Flex>
					</Flex>
				</Link>
			</Card>
		</li>
	);
};
