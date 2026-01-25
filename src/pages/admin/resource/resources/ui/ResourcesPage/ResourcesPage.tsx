import { Flex } from '@/shared/ui/Flex';
import { Tabs, useTabs } from '@/shared/ui/Tabs';

import { useGetResourcesPageTabs } from '../../model/hooks/useGetResourcesPageTabs';

const ResourcesPage = () => {
	const tabs = useGetResourcesPageTabs();
	const { activeTab, setActiveTab } = useTabs(tabs);

	const ActiveComponent = activeTab.Component;

	return (
		<Flex componentType="main" direction="column">
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<ActiveComponent />
		</Flex>
	);
};

export default ResourcesPage;
