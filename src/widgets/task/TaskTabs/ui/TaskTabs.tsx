import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Task as TaskTranslations } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Tabs, Tab } from '@/shared/ui/Tabs';

import { TaskDescription, TaskSolutions } from '@/entities/task';

import { useTaskTabsQuery } from '../model/hooks/useTaskTabsQuery';
import type { TaskTabId, TaskTabsProps } from '../model/types/types';

import styles from './TaskTabs.module.css';

export const TaskTabs = ({ task, solutions }: TaskTabsProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const tabs: Tab<TaskTabId>[] = useMemo(
		() => [
			{
				id: 'description',
				label: t(TaskTranslations.DESCRIPTION_TAB_TITLE),
				Component: () => <TaskDescription task={task} />,
			},
			{
				id: 'solutions',
				label: t(TaskTranslations.SOLUTIONS_TAB_TITLE),
				Component: () => <TaskSolutions solutions={solutions} />,
			},
		],
		[task, solutions],
	);

	const { activeTab, setActiveTab } = useTaskTabsQuery(tabs);

	if (!activeTab) {
		return null;
	}

	return (
		<Card className={styles.wrapper} withShadow>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} disableHashUpdate />
			<div className={styles.content}>{activeTab.Component()}</div>
		</Card>
	);
};
