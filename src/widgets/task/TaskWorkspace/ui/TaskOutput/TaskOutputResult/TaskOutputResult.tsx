import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';
import { Stub } from '@/shared/ui/Stub';
import { Text } from '@/shared/ui/Text';

import type { ExecuteCodeResponse } from '@/entities/task';

import { TaskTestCaseResult } from '../../../model/types/types';
import { TaskOutputTestCaseInfo } from '../TaskOutputTestCaseInfo/TaskOutputTestCaseInfo';

import styles from './TaskOutputResult.module.css';

type TaskOutputResultProps = {
	result: ExecuteCodeResponse | null;
	testCases: TaskTestCaseResult;
	errorMessage: string;
};

export const TaskOutputResult = ({ result, testCases, errorMessage }: TaskOutputResultProps) => {
	const { t } = useTranslation(i18Namespace.task);

	if (!result) {
		return (
			<Stub
				type="empty"
				title={t(Tasks.OUTPUT_RESULT_STUB_TITLE)}
				subtitle={t(Tasks.OUTPUT_RESULT_STUB_SUBTITLE)}
			/>
		);
	}

	const hasError = result?.overall_status === 'ERROR';
	const hasFailedTests = !testCases?.summary?.success;

	const showResult = hasFailedTests
		? testCases?.tests?.find((testCase) => testCase.status === 'FAIL')
		: testCases?.tests?.[0];

	return (
		<Flex direction="column" gap="16">
			{hasError ? (
				<>
					<Text variant="body5-accent" color="red-700">
						{t(Tasks.OUTPUT_TESTS_TEST_CASE_ERROR_MESSAGE)}
					</Text>
					<div className={styles.error}>{errorMessage}</div>
				</>
			) : (
				<>
					<Flex gap="12" align="center">
						<Text variant="body5-accent" color={hasFailedTests ? 'red-700' : 'green-800'}>
							{t(hasFailedTests ? Tasks.TABLE_STATUS_NOT_SOLVED : Tasks.TABLE_STATUS_SOLVED)}
						</Text>
						{testCases.summary.total > 0 && (
							<Text variant="body3-accent" color="black-500">
								{t(Tasks.OUTPUT_RESULT_TESTS_PASSED, {
									passed: testCases.summary.passed,
									total: testCases.summary.total,
								})}
							</Text>
						)}
					</Flex>
					{showResult && <TaskOutputTestCaseInfo testCase={showResult} />}
				</>
			)}
		</Flex>
	);
};
