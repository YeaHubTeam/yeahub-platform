import classnames from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { SimpleStub } from '@/shared/ui/SimpleStub';
import { Text } from '@/shared/ui/Text';

import { TaskTestCaseResult } from '../../../model/types/types';
import { TaskOutputTestCaseInfo } from '../TaskOutputTestCaseInfo/TaskOutputTestCaseInfo';

import styles from './TaskOutputTests.module.css';

type TaskOutputTestsProps = {
	testCases: TaskTestCaseResult;
};

export const TaskOutputTests = ({ testCases }: TaskOutputTestsProps) => {
	const { t } = useTranslation(i18Namespace.task);
	console.log(testCases);
	const [activeTestCase, setActiveTestCase] = useState<number>(0);

	if (!testCases.summary || !testCases.summary?.total) {
		return <SimpleStub variant="empty" text={t(Tasks.OUTPUT_TESTS_TEST_CASE_EMPTY)} />;
	}

	return (
		<Flex direction="column" gap="20">
			<Flex gap="10" wrap="wrap">
				{testCases.tests.map((testCase, index) => (
					<Flex
						key={index}
						onClick={() => setActiveTestCase(index)}
						align="center"
						justify="center"
						className={classnames(styles.tab, {
							[styles.success]: testCase.status === 'PASS',
							[styles.error]: testCase.status === 'FAIL',
							[styles.active]: index === activeTestCase,
						})}
					>
						<Text
							variant="body3-strong"
							color={testCase.status === 'PASS' ? 'green-800' : 'red-700'}
						>
							{t(Tasks.OUTPUT_TESTS_TEST_CASE_TITLE, { index: index + 1 })}
						</Text>
					</Flex>
				))}
			</Flex>
			<TaskOutputTestCaseInfo testCase={testCases.tests[activeTestCase]} />
		</Flex>
	);
};
