import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Tab } from './Tabs';

export const useTabs = <T>(tabs: Tab<T>[]) => {
	const { hash } = useLocation();
	const currentTab = tabs.find((tab) => tab.id === hash.slice(1));

	const [activeTab, setActiveTab] = useState<Tab<T>>(currentTab ?? tabs[0]);

	return {
		activeTab,
		setActiveTab,
	};
};
