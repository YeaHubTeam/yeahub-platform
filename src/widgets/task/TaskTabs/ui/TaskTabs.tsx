import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Tasks } from '@/shared/config';
import { Card } from '@/shared/ui/Card';
import { Tabs, Tab } from '@/shared/ui/Tabs';

import { TaskDescription, TaskSolutions } from '@/entities/task';

import { useTaskTabsQuery } from '../model/hooks/useTaskTabsQuery';
import type { TaskTabId, TaskTabsProps } from '../model/types/types';

import styles from './TaskTabs.module.css';

export const TaskTabs = ({ task }: TaskTabsProps) => {
	const { t } = useTranslation(i18Namespace.task);

	const tabs: Tab<TaskTabId>[] = useMemo(
		() => [
			{
				id: 'description',
				label: t(Tasks.DESCRIPTION_TAB_TITLE),
				Component: () => <TaskDescription task={task} />,
			},
			{
				id: 'solutions',
				label: t(Tasks.SOLUTIONS_TAB_TITLE),
				Component: () => <TaskSolutions />,
			},
		],
		[task],
	);

	const { activeTab, setActiveTab } = useTaskTabsQuery(tabs);

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
