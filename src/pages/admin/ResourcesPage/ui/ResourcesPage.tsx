import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';
import { Tab, Tabs, useTabs } from '@/shared/ui/Tabs';

import ResourcesAllTab from './tabs/ResourcesAllTab/ui/ResourcesAllTab/ResourcesAllTab';
import { ResourcesRequestsTab } from './tabs/ResourcesRequestsTab';

/**
 * Page showing info about all the created questions
 * @constructor
 */

type AdminResourcesTabId = 'all' | 'requests';

const createAdminResourcesTabs = (t: (key: string) => string): Tab<AdminResourcesTabId>[] => [
	{
		id: 'all',
		label: t(ResourceRequests.TABS_ALL),
		Component: ResourcesAllTab,
	},
	{
		id: 'requests',
		label: t(ResourceRequests.TABS_REQUESTS),
		Component: ResourcesRequestsTab,
	},
];

const ResourcesAdminPage = () => {
	const { t } = useTranslation(i18Namespace.resources);
	const tabs = useMemo(() => createAdminResourcesTabs(t), [t]);
	const { activeTab, setActiveTab } = useTabs(tabs);

	const ActiveComponent = activeTab.Component;

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<ActiveComponent />
		</Flex>
	);
};

export default ResourcesAdminPage;
