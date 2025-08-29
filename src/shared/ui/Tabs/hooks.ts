import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Tab } from './Tabs';

export const useTabs = <T>(tabs: Tab<T>[]) => {
	const { hash } = useLocation();
	const currentTab = useMemo(() => tabs.find((tab) => tab.id === hash.slice(1)), [hash, tabs]);

	const [activeTab, setActiveTab] = useState<Tab<T>>(currentTab ?? tabs[0]);

	useEffect(() => {
		if (currentTab) {
			setActiveTab(currentTab);
		}
	}, [hash]);

	return {
		activeTab,
		setActiveTab,
	};
};
