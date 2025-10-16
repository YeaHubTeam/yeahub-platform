import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useModal, useScreenSize } from '@/shared/hooks';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';
import { Text } from '@/shared/ui/Text';

import { useGetMyRequestsResourcesQuery } from '@/entities/resource';
import { MyResourcesFilterParams, ResourceRequestStatus } from '@/entities/resource';

import {
	MyResourcesList,
	useMarketplaceFilters,
	MyResourcesPagination,
	MyResourcesFiltersPanel,
} from '@/widgets/Marketplace';

import styles from './MyResourcesPage.module.css';
import { MyResourcesPageSkeleton } from './MyResourcesPageSkeleton.skeleton';

const RESOURCES_PER_PAGE = 6;

const MyResourcesPage = () => {
	const { isOpen, onToggle, onClose } = useModal();

	const { isMobile, isTablet, isMobileS } = useScreenSize();

	const navigate = useNavigate();

	const {
		onChangeResources,
		filter,
		onChangePage,
		onChangeSearchParams,
		onChangeStatus,
		resetFilters,
	} = useMarketplaceFilters();

	const {
		data: resourcesResponse,
		isLoading,
		// error,
	} = useGetMyRequestsResourcesQuery({
		page: filter.page ?? 1,
		limit: RESOURCES_PER_PAGE,
		status: filter.status !== 'all' ? (filter.status as ResourceRequestStatus) : undefined,
		search: filter.title,
		types: filter.resources,
	});

	const titleVariant = isMobileS ? 'body5-accent' : 'body6';

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;
	const hasFilters = filter.status !== 'all' || filter.resources;

	const { t } = useTranslation(i18Namespace.marketplace);

	const title = hasResources
		? t(Marketplace.MY_RESOURCES)
		: t(Marketplace.MY_RESOURCES_EMPTY_TITLE);

	if (isLoading) {
		return <MyResourcesPageSkeleton />;
	}

	// if (error) {
	// 	return <div>Не удалось загрузить ресурсы</div>;
	// }

	const renderFilters = () => (
		<MyResourcesFiltersPanel
			filter={filter as MyResourcesFilterParams}
			onChangeSearch={onChangeSearchParams}
			onChangeResources={onChangeResources}
			onChangeStatus={onChangeStatus}
		/>
	);

	const filterButton = (
		<div className={styles['filters-mobile']}>
			<IconButton
				aria-label="открыть фильтры"
				form="square"
				icon={<Icon icon="slidersHorizontal" color="black-700" />}
				size="small"
				variant="tertiary"
				onClick={onToggle}
			/>
			<Drawer
				rootName="body"
				isOpen={isOpen}
				onClose={onClose}
				className={styles.drawer}
				hasCloseButton
			>
				<Card className={styles['drawer-content']}>{renderFilters()}</Card>
			</Drawer>
		</div>
	);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main} withOutsideShadow>
				<Flex className={styles.header}>
					<Text variant={titleVariant} isMainTitle className={styles.text}>
						{title}
					</Text>
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && filterButton}
					</Flex>
				</Flex>
				{hasResources ? (
					<MyResourcesList resources={resources} />
				) : hasFilters ? (
					<EmptyFilterStub resetFilters={resetFilters}></EmptyFilterStub>
				) : (
					<EmptyStub
						text={t(Marketplace.MY_RESOURCES_EMPTY_DESCRIPTION)}
						buttonText={t(Marketplace.MY_RESOURCES_EMPTY_BUTTON)}
						onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
					/>
				)}
				<MyResourcesPagination
					resourcesResponse={resourcesResponse}
					currentPage={filter.page ?? 1}
					onChangePage={onChangePage}
				/>
			</Card>
			<Flex className={styles['button-wrapper']}>
				{!isMobile && !isTablet && <Card className={styles.filters}>{renderFilters()}</Card>}
			</Flex>
		</Flex>
	);
};

export default MyResourcesPage;
