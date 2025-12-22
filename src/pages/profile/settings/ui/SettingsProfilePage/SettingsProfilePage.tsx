import { Tabs } from '@/shared/ui/Tabs';

import { useGetSettingsProfileTabs } from '../../model/hooks/useGetSettingsProfileTabs';

const SettingsProfilePage = () => {
	const { tabs, setActiveTab, activeTab } = useGetSettingsProfileTabs();

	const ActiveComponent = activeTab.Component;

	return (
		<>
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<ActiveComponent />
		</>
	);
};

export default SettingsProfilePage;
