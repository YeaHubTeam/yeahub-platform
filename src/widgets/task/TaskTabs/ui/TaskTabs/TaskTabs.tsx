import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Tabs, Tab } from '@/shared/ui/Tabs';

import { type ExecuteCodeResponse, type TaskTestCaseResult, Task } from '@/entities/task';

import { useTaskTabsQuery } from '../../libs/hooks/useTaskTabsQuery';
import type { TaskTabId } from '../../model/types/types';
import { TaskDescription } from '../tabs/TaskDescription/TaskDescription';
import { TaskOutputResult } from '../tabs/TaskOutputResult/TaskOutputResult';
import { TaskOutputTests } from '../tabs/TaskOutputTests/TaskOutputTests';
import { TaskSolutions } from '../tabs/TaskSolutions/TaskSolutions';

import styles from './TaskTabs.module.css';

interface TaskTabsProps {
	task: Task;
	result: ExecuteCodeResponse | null;
}

export const TaskTabs = ({ task, result }: TaskTabsProps) => {
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

	const tabs: Tab<TaskTabId>[] = useMemo(
		() => [
			{
				id: 'description',
				label: t(Tasks.DESCRIPTION_TAB_TITLE),
				Component: () => <TaskDescription task={task} />,
			},
			{
				id: 'result',
				label: t(Tasks.OUTPUT_RESULT_TAB_TITLE),
				Component: () => <TaskOutputResult result={result} testCases={testCases} />,
			},
			{
				id: 'tests',
				label: t(Tasks.OUTPUT_TESTS_TAB_TITLE),
				Component: () => <TaskOutputTests testCases={testCases} />,
			},
			{
				id: 'solutions',
				label: t(Tasks.SOLUTIONS_TAB_TITLE),
				Component: () => <TaskSolutions />,
			},
		],
		[t, task, result, testCases],
	);

	const { activeTab, setActiveTab } = useTaskTabsQuery(tabs);

	useEffect(() => {
		if (result) {
			setActiveTab(tabs[1]);
		}
	}, [result]);

	if (!activeTab) {
		return null;
	}

	return (
		<Card className={styles.wrapper} withOutsideShadow>
			<Tabs
				color="gray"
				tabs={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				disableHashUpdate
			/>
			<div className={styles.content}>{activeTab.Component()}</div>
		</Card>
	);
};
