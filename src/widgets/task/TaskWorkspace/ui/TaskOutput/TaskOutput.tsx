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

		return result.test_cases[0].actual_output ? JSON.parse(result.test_cases[0].actual_output) : {};
	}, [result]);

	const errorMessage = useMemo(() => {
		if (!result) {
			return '';
		}

		return result.test_cases[0].error_message;
	}, [result]);

	console.log(testCases);

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
