import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Tab } from '@/shared/ui/Tabs';

import type { ChallengeTabId } from '../types/types';

export const useChallengeTabsQuery = (tabs: Tab<ChallengeTabId>[]) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeTab, setActiveTab] = useState<Tab<ChallengeTabId> | null>(null);

	const tabFromQuery = searchParams.get('tab') as ChallengeTabId | null;

	useEffect(() => {
		if (tabs.length === 0) return;

		const targetTab = tabFromQuery ? tabs.find((tab) => tab.id === tabFromQuery) : tabs[0];

		if (targetTab && (!activeTab || activeTab.id !== targetTab.id)) {
			setActiveTab(targetTab);
		}
	}, [tabFromQuery, activeTab, tabs]);

	const handleSetActiveTab = useCallback(
		(tab: Tab<ChallengeTabId>) => {
			setActiveTab(tab);
			const params = new URLSearchParams(searchParams);
			params.set('tab', tab.id);
			setSearchParams(params, { replace: true });
		},
		[searchParams, setSearchParams],
	) as Dispatch<SetStateAction<Tab<ChallengeTabId>>>;

	return {
		activeTab,
		setActiveTab: handleSetActiveTab,
	};
};
