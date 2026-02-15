import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { TaskTestCaseResultTest } from '../../../model/types/types';

import styles from './TaskOutputTestCaseInfo.module.css';

interface TaskOutputTestCaseInfoProps {
	testCase: TaskTestCaseResultTest;
}

export const TaskOutputTestCaseInfo = ({ testCase }: TaskOutputTestCaseInfoProps) => {
	const { t } = useTranslation(i18Namespace.task);
	return (
		<Flex direction="column" gap="20">
			{testCase.inputs.map((input, index) => {
				return (
					<Flex gap="20" direction="column" key={index}>
						<Text variant="body3-strong">{t(Tasks.TEST_CASES_INPUT)}</Text>
						<div className={styles.stats}>{JSON.stringify(input)}</div>
					</Flex>
				);
			})}
			<Flex gap="20" direction="column">
				<Text variant="body3-strong">{t(Tasks.TEST_CASES_OUTPUT)}</Text>
				<div
					className={classnames(styles.stats, {
						[styles.error]: testCase.status === 'FAIL',
					})}
				>
					{JSON.stringify(testCase.result)}
				</div>
			</Flex>

			<Flex gap="20" direction="column">
				<Text variant="body3-strong">{t(Tasks.TEST_CASES_EXPECTED_OUTPUT)}</Text>
				<div className={styles.stats}>{JSON.stringify(testCase.expected)}</div>
			</Flex>
		</Flex>
	);
};
