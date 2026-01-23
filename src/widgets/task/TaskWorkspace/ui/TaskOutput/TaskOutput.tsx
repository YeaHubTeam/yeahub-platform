import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Task as TaskTranslations } from '@/shared/config';
import { Tab, Tabs } from '@/shared/ui/Tabs';

import { useTaskOutputQuery } from '../../model/hooks/useTaskOutputQuery';
import type { TaskOutputProps, OutputTabId } from '../../model/types/types';

import styles from './TaskOutput.module.css';
import { TaskOutputResult } from './TaskOutputResult/TaskOutputResult';
import { TaskOutputTests } from './TaskOutputTests/TaskOutputTests';

export const TaskOutput = ({ result }: TaskOutputProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const tabs: Tab<OutputTabId>[] = useMemo(
		() => [
			{
				id: 'result',
				label: t(TaskTranslations.OUTPUT_RESULT_TAB_TITLE),
				Component: () => <TaskOutputResult result={result} />,
			},
			{
				id: 'tests',
				label: t(TaskTranslations.OUTPUT_TESTS_TAB_TITLE),
				Component: () => <TaskOutputTests result={result} />,
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
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} disableHashUpdate />
			<div className={styles.content}>{activeTab.Component()}</div>
		</div>
	);
};
