import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Tabs } from '@/shared/ui/Tabs';
import type { Tab } from '@/shared/ui/Tabs';

interface IndustryTabsProps {
	availableIndustries?: string[];
}

export const IndustryTabs = ({ availableIndustries }: IndustryTabsProps) => {
	const location = useLocation();

	const tabs = useMemo<Tab<string>[]>(
		() => [
			{ id: 'all', label: 'Все', Component: () => <div /> },
			...(availableIndustries ?? []).map((industry) => ({
				id: industry,
				label: industry,
				Component: () => <div />,
			})),
		],
		[availableIndustries],
	);

	const currentHash = location.hash ? location.hash.replace('#', '') : 'all';

	const currentTab = tabs.find((tab) => tab.id === currentHash) ?? tabs[0];

	const [activeTab, setActiveTab] = useState(currentTab);

	useEffect(() => {
		setActiveTab(currentTab);
	}, [currentTab]);

	if (!availableIndustries?.length) {
		return null;
	}

	return <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
};
