import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Tab } from '@/shared/ui/Tabs';

import type { OutputTabId } from '../types/types';

export const useTaskOutputQuery = (tabs: Tab<OutputTabId>[]) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tab<OutputTabId> | null>(null);

	const tabFromQuery = searchParams.get('outputTab') as OutputTabId | null;

	useEffect(() => {
		if (tabs.length === 0) return;

		const targetTab = tabFromQuery ? tabs.find((tab) => tab.id === tabFromQuery) : tabs[0];

		if (targetTab && activeTab !== targetTab) {
			setActiveTab(targetTab);
		}
	}, [tabFromQuery, activeTab, tabs]);

	const handleSetActiveTab = useCallback(
		(tab: Tab<OutputTabId>) => {
			setActiveTab(tab);
			const params = new URLSearchParams(searchParams);
			params.set('outputTab', tab.id);
			setSearchParams(params, { replace: true });
		},
		[searchParams, setSearchParams],
	) as Dispatch<SetStateAction<Tab<OutputTabId>>>;

	return {
		activeTab,
		setActiveTab: handleSetActiveTab,
	};
};
