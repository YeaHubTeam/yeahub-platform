import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { ResourceRequests } from '@/shared/config/i18n/i18nTranslations';
import { Tab } from '@/shared/ui/Tabs';

import { useGetResourcesRequestsTotal } from '@/pages/admin/ResourcesPage/model/hooks/useGetResourcesRequestsTotal';

import { ResourcesAllTab } from '../../ui/tabs/ResourcesAllTab/ResourcesAllTab/ResourcesAllTab';
import { ResourcesRequestsTab } from '../../ui/tabs/ResourcesRequestsTab/ResourcesRequestsTab/ResourcesRequestsTab';

type AdminResourcesTabId = 'all' | 'requests';

export const useGetResourcesPageTabs = () => {
	const { t } = useTranslation(i18Namespace.resources);
	const baseRequestsLabel = t(ResourceRequests.TABS_REQUESTS);
	const { total, isLoading } = useGetResourcesRequestsTotal();
	const requestsLabel = !isLoading && total ? `${baseRequestsLabel} (${total})` : baseRequestsLabel;

	const tabs: Tab<AdminResourcesTabId>[] = [
		{
			id: 'all',
			label: t(ResourceRequests.TABS_ALL),
			Component: ResourcesAllTab,
		},
		{
			id: 'requests',
			label: requestsLabel,
			Component: ResourcesRequestsTab,
		},
	];

	return tabs;
};
