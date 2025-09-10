import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useGetMyRequestsResourcesQuery } from '@/entities/resource';

import {
	MyResourcesList,
	useMarketplaceFilters,
	MyResourcesPagination,
} from '@/widgets/Marketplace';

import styles from './MyResourcesPage.module.css';

const RESOURCES_PER_PAGE = 6;

const MyResourcesPage = () => {
	const { filter, onChangePage } = useMarketplaceFilters();

	const {
		data: resourcesResponse,
		isLoading,
		error,
	} = useGetMyRequestsResourcesQuery({
		page: filter.page ?? 1,
		limit: RESOURCES_PER_PAGE,
	});

	const resources = resourcesResponse?.data ?? [];

	const { t } = useTranslation(i18Namespace.marketplace);

	if (isLoading) {
		return <div>Loading…</div>;
	}

	if (error) {
		return <div>Не удалось загрузить ресурсы</div>;
	}

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main}>
				<Flex className={styles.header}>
					<Text variant="body6" isMainTitle>
						{t(Marketplace.MY_RESOURCES)}
					</Text>
				</Flex>
				<MyResourcesList resources={resources} />

				<MyResourcesPagination
					resourcesResponse={resourcesResponse}
					currentPage={filter.page ?? 1}
					onChangePage={onChangePage}
				/>
			</Card>
		</Flex>
	);
};

export default MyResourcesPage;
