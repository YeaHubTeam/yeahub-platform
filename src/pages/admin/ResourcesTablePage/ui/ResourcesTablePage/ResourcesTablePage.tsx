import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useQueryFilter } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Tab, Tabs, useTabs } from '@/shared/ui/Tabs';

import { useGetResourcesListQuery } from '@/entities/resource';

import { ResourcesTable } from '@/widgets/resources/';
import { SearchSection } from '@/widgets/SearchSection';

import { ResourcesRequestsTablePage } from '@/pages/admin/ResourcesRequestsTablePage';

import {
	getResourcesPageNum,
	getResourcesSearch,
	getSelectedResources,
} from '../../model/selectors/resourcesTablePageSelectors';
import { resourcesTablePageActions } from '../../model/slice/resourcesTablePageSlice';
import { ResourcesPagePagination } from '../ResourcesTablePagePagination/ResourcesTablePagePagination';

import styles from './ResourcesTablePage.module.css';

/**
 * Page showing info about all the created questions
 * @constructor
 */

type AdminResourcesTabId = 'all' | 'requests';

const AdminResourcesAllTab = () => {
	const dispatch = useAppDispatch();
	const search = useSelector(getResourcesSearch);
	const selectedResources = useSelector(getSelectedResources);
	const page = useSelector(getResourcesPageNum);

	const { filter, handleFilterChange } = useQueryFilter();

	const { data: resources } = useGetResourcesListQuery({
		page,
		name: search,
	});

	const onChangeSearch = (value: string) => {
		dispatch(resourcesTablePageActions.setSearch(value));
	};

	const onPageChange = (page: number) => {
		handleFilterChange({ page });
		dispatch(resourcesTablePageActions.setPage(page));
	};

	return (
		<Flex componentType="main" direction="column" gap="24">
			<SearchSection
				to="create"
				showRemoveButton={selectedResources.length > 0}
				onSearch={onChangeSearch}
			/>
			<Card className={styles.content}>
				<ResourcesTable resources={resources?.data} />
				<ResourcesPagePagination
					resourcesResponse={resources}
					currentPage={filter.page || 1}
					onPageChange={onPageChange}
				/>
			</Card>
		</Flex>
	);
};

const createAdminResourcesTabs = (): Tab<AdminResourcesTabId>[] => [
	{
		id: 'all',
		label: 'Все ресурсы',
		Component: AdminResourcesAllTab,
	},
	{
		id: 'requests',
		label: 'Заявки',
		Component: ResourcesRequestsTablePage,
	},
];

const ResourcesTablePage = () => {
	const tabs = useMemo(createAdminResourcesTabs, []);
	const { activeTab, setActiveTab } = useTabs(tabs);
	const navigate = useNavigate();
	const location = useLocation();
	const lastSearchRef = useRef(location.search);

	useEffect(() => {
		if (location.search) {
			lastSearchRef.current = location.search;
		}
	}, [location.search]);

	useLayoutEffect(() => {
		const expectedHash = `#${activeTab.id}`;
		const storedSearch = lastSearchRef.current ?? '';
		const targetSearch = location.search || storedSearch;
		const needHashUpdate = location.hash !== expectedHash;
		const needSearchRestore = !location.search && storedSearch;

		if (needHashUpdate || needSearchRestore) {
			navigate(`${location.pathname}${targetSearch}${expectedHash}`, { replace: true });
		}
	}, [activeTab.id, location.hash, location.pathname, location.search, navigate]);

	const ActiveComponent = activeTab.Component;

	return (
		<Flex componentType="main" direction="column" gap="24">
			<Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
			<ActiveComponent />
		</Flex>
	);
};

export default ResourcesTablePage;
