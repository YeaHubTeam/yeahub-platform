import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Tab, Tabs } from '@/shared/ui/Tabs';

import type { ExecuteCodeResponse } from '@/entities/task';

import { useTaskOutputQuery } from '../../model/hooks/useTaskOutputQuery';
import { OutputTabId, TaskTestCaseResult } from '../../model/types/types';

import styles from './TaskOutput.module.css';
import { TaskOutputResult } from './TaskOutputResult/TaskOutputResult';
import { TaskOutputTests } from './TaskOutputTests/TaskOutputTests';

export type TaskOutputProps = {
	result: ExecuteCodeResponse | null;
};

export const TaskOutput = ({ result }: TaskOutputProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const testCases: TaskTestCaseResult = useMemo(() => {
		if (!result) {
			return {};
		}
		const output = result.test_cases[0].actual_output;

		if (!output) {
			return {};
		}

		if (output.substring(0, 10).includes('tests')) {
			return JSON.parse(output);
		} else {
			const separators = ['{"tests', '{\n"tests', '{\n "tests', '{ "tests'];
			const index = output.indexOf(
				separators.find((separator) => output.includes(separator)) || '',
			);

			if (index !== -1) {
				const tests = output.slice(index);
				const result: TaskTestCaseResult = tests ? JSON.parse(tests) : {};

				return result;
			}

			return JSON.parse(output);
		}
	}, [result]);

	const errorMessage = useMemo(() => {
		if (!result) {
			return '';
		}

		return result.test_cases[0].error_message;
	}, [result]);

	const tabs: Tab<OutputTabId>[] = useMemo(
		() => [
			{
				id: 'result',
				label: t(Tasks.OUTPUT_RESULT_TAB_TITLE),
				Component: () => (
					<TaskOutputResult result={result} testCases={testCases} errorMessage={errorMessage} />
				),
			},
			{
				id: 'tests',
				label: t(Tasks.OUTPUT_TESTS_TAB_TITLE),
				Component: () => <TaskOutputTests testCases={testCases} />,
			},
		],
		[result, t],
	);

	const { activeTab, setActiveTab } = useTaskOutputQuery(tabs);

	if (!activeTab) {
		return null;
	}

	return (
		<div className={styles.wrapper}>
			<Tabs
				color="gray"
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				disableHashUpdate
			/>
			<div className={styles.content}>{activeTab.Component()}</div>
		</div>
	);
};
