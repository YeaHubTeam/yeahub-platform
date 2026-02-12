import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Tab, Tabs } from '@/shared/ui/Tabs';
import { Text } from '@/shared/ui/Text';

import type { ExecuteCodeResponse } from '@/entities/task';

import styles from './TaskOutputTests.module.css';

type TaskOutputTestsProps = {
	result: ExecuteCodeResponse | null;
};

export const TaskOutputTests = ({ result }: TaskOutputTestsProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const testTabs: Tab<number>[] = useMemo(() => {
		if (!result || !result.test_cases || result.test_cases.length === 0) {
			return [];
		}

		return result.test_cases.map((testCase, index) => ({
			id: index,
			label: t(Tasks.OUTPUT_TESTS_TEST_CASE_TITLE, { index: index + 1 }),
			Component: () => (
				<div className={styles['test-content']}>
					<div className={styles['test-status']}>
						<Text
							variant="body3-strong"
							color={testCase.status === 'PASSED' ? 'green-500' : 'red-500'}
						>
							{t(Tasks.OUTPUT_TESTS_TEST_CASE_STATUS)}:{' '}
							{testCase.status === 'PASSED'
								? t(Tasks.OUTPUT_TESTS_TEST_CASE_PASSED)
								: t(Tasks.OUTPUT_TESTS_TEST_CASE_FAILED)}
						</Text>
						{testCase.is_hidden && (
							<Text variant="body3">{t(Tasks.OUTPUT_TESTS_TEST_CASE_HIDDEN)}</Text>
						)}
					</div>

					{!testCase.is_hidden && (
						<>
							<div className={styles['test-block']}>
								<Text variant="body3-strong">{t(Tasks.OUTPUT_TESTS_TEST_CASE_INPUT)}:</Text>
								<pre className={styles.code}>{JSON.stringify(testCase.input, null, 2)}</pre>
							</div>

							<div className={styles['test-block']}>
								<Text variant="body3-strong">
									{t(Tasks.OUTPUT_TESTS_TEST_CASE_EXPECTED_OUTPUT)}:
								</Text>
								<pre className={styles.code}>
									{JSON.stringify(testCase.expected_output, null, 2)}
								</pre>
							</div>

							<div className={styles['test-block']}>
								<Text variant="body3-strong">{t(Tasks.OUTPUT_TESTS_TEST_CASE_ACTUAL_OUTPUT)}:</Text>
								<pre className={styles.code}>{testCase.actual_output}</pre>
							</div>
						</>
					)}

					{testCase.error_message && (
						<div className={styles['test-block']}>
							<Text variant="body3-strong" color="red-500">
								{t(Tasks.OUTPUT_TESTS_TEST_CASE_ERROR_MESSAGE)}:
							</Text>
							<pre className={styles.code}>{testCase.error_message}</pre>
						</div>
					)}

					<div className={styles['test-metrics']}>
						<Text variant="body3">
							{t(Tasks.OUTPUT_TESTS_TEST_CASE_EXECUTION_TIME)}: {testCase.execution_time.toFixed(2)}{' '}
							мс
						</Text>
						<Text variant="body3">
							{t(Tasks.OUTPUT_TESTS_TEST_CASE_MEMORY_USAGE)}: {testCase.memory_usage.toFixed(2)} KB
						</Text>
					</div>
				</div>
			),
		}));
	}, [result]);

	const [activeTestTab, setActiveTestTab] = useState<Tab<number> | null>(
		testTabs.length > 0 ? testTabs[0] : null,
	);

	if (testTabs.length === 0 || !activeTestTab) {
		return (
			<div className={styles.empty}>
				<Text variant="body3">{t(Tasks.OUTPUT_TESTS_TEST_CASE_EMPTY)}</Text>
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Tabs
				tabs={testTabs}
				activeTab={activeTestTab}
				setActiveTab={setActiveTestTab as React.Dispatch<React.SetStateAction<Tab<number>>>}
			/>
			<div className={styles.content}>{activeTestTab.Component()}</div>
		</div>
	);
};
