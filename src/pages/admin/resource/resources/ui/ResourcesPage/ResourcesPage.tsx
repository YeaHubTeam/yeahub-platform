import { Flex } from '@/shared/ui/Flex';
import { Tabs, useTabs } from '@/shared/ui/Tabs';

import { MyRequestsToggle } from '@/features/resources/myRequestsFilter';

import { useGetResourcesPageTabs } from '../../model/hooks/useGetResourcesPageTabs';

const ResourcesPage = () => {
	const tabs = useGetResourcesPageTabs();
	const { activeTab, setActiveTab } = useTabs(tabs);

	const ActiveComponent = activeTab.Component;

	return (
		<Flex componentType="main" direction="column">
			<Flex componentType="main" direction="row" justify="between" align="center">
				<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
				{activeTab.id === 'requests' && <MyRequestsToggle />}
			</Flex>
			<ActiveComponent />
		</Flex>
	);
};

export default ResourcesPage;
