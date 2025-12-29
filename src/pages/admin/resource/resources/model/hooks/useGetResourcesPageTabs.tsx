import { useTranslation } from 'react-i18next';

import { i18Namespace, ResourceRequests } from '@/shared/config';
import { Tab } from '@/shared/ui/Tabs';

import { useGetResourceRequestsReviewCountQuery } from '@/entities/resource';

import { ResourcesAllTab } from '../../ui/tabs/ResourcesAllTab/ResourcesAllTab';
import { ResourcesRequestsTab } from '../../ui/tabs/ResourcesRequestsTab/ResourcesRequestsTab';

type AdminResourcesTabId = 'all' | 'requests';

export const useGetResourcesPageTabs = () => {
	const { t } = useTranslation(i18Namespace.resources);
	const { data: requestsReviewTotal } = useGetResourceRequestsReviewCountQuery();

	const tabs: Tab<AdminResourcesTabId>[] = [
		{
			id: 'all',
			label: t(ResourceRequests.TABS_ALL),
			Component: ResourcesAllTab,
		},
		{
			id: 'requests',
			label: t(ResourceRequests.TABS_REQUESTS),
			count: requestsReviewTotal,
			Component: ResourcesRequestsTab,
		},
	];

	return tabs;
};
