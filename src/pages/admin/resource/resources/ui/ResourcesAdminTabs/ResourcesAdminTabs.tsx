import { useState } from 'react';

import { Tabs, Tab } from '@/shared/ui/Tabs';

type ResourcesTabId = 'resources' | 'requests' | 'partnership';

const tabs: Tab<ResourcesTabId>[] = [
	{
		id: 'resources',
		label: 'Все ресурсы',
		Component: () => <div>Все ресурсы</div>,
	},
	{
		id: 'requests',
		label: 'Заявки',
		Component: () => <div>Заявки</div>,
	},
	{
		id: 'partnership',
		label: 'Партнёрство',
		Component: () => <div>Партнёрство</div>,
	},
];

export const ResourcesAdminTabs = () => {
	const [activeTab, setActiveTab] = useState<Tab<ResourcesTabId>>(tabs[0]);

	return <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />;
};
