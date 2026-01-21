import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Tab } from '@/shared/ui/Tabs';

import type { TaskTabId } from '../types/types';

export const useTaskTabsQuery = (tabs: Tab<TaskTabId>[]) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tab<TaskTabId> | null>(null);

	const tabFromQuery = searchParams.get('tab') as TaskTabId | null;

	useEffect(() => {
		if (tabs.length === 0) return;

		const targetTab = tabFromQuery ? tabs.find((tab) => tab.id === tabFromQuery) : tabs[0];

		if (targetTab && (!activeTab || activeTab.id !== targetTab.id)) {
			setActiveTab(targetTab);
		}
	}, [tabFromQuery, activeTab, tabs]);

	const handleSetActiveTab = useCallback(
		(tab: Tab<TaskTabId>) => {
			setActiveTab(tab);
			const params = new URLSearchParams(searchParams);
			params.set('tab', tab.id);
			setSearchParams(params, { replace: true });
		},
		[searchParams, setSearchParams],
	) as Dispatch<SetStateAction<Tab<TaskTabId>>>;

	return {
		activeTab,
		setActiveTab: handleSetActiveTab,
	};
};
