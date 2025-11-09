import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace } from '@/shared/config/i18n';
import { Marketplace } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector, useScreenSize } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { EmptyStub } from '@/shared/ui/EmptyStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getIsEmailVerified } from '@/entities/profile';
import { ResourceRequestStatus, useGetMyRequestsResourcesQuery } from '@/entities/resource';

import {
	ResourceRequestsFilters,
	useResourceRequestsFilters,
} from '@/features/resources/filterResourceRequests';

import { MyResourcesList, MyResourcesPagination } from '@/widgets/Marketplace';

import styles from './MyResourcesPage.module.css';
import { MyResourcesPageSkeleton } from './MyResourcesPageSkeleton.skeleton';

const MyResourcesPage = () => {
	const { isMobile, isTablet, isMobileS } = useScreenSize();

	const navigate = useNavigate();
	const isEmailVerified = useAppSelector(getIsEmailVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	const {
		onChangeTypes,
		filters,
		onChangePage,
		onChangeTitle,
		onChangeStatus,
		onResetFilters,
		hasFilters,
	} = useResourceRequestsFilters({ status: 'all', page: 1 });

	const { data: resourcesResponse, isLoading } = useGetMyRequestsResourcesQuery({
		page: filters.page ?? 1,
		status: filters.status !== 'all' ? (filters.status as ResourceRequestStatus) : undefined,
		search: filters.title,
		types: filters.types,
	});

	const titleVariant = isMobileS ? 'body5-accent' : 'body6';

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	const { t } = useTranslation(i18Namespace.marketplace);

	const title = hasResources
		? t(Marketplace.MY_RESOURCES)
		: t(Marketplace.MY_RESOURCES_EMPTY_TITLE);

	if (isLoading) {
		return <MyResourcesPageSkeleton />;
	}

	const renderFilters = () => (
		<ResourceRequestsFilters
			filters={filters}
			onChangeTitle={onChangeTitle}
			onChangeTypes={onChangeTypes}
			onChangeStatus={onChangeStatus}
		/>
	);

	const suggestButton = (
		<Button
			variant="link-purple"
			suffix={<Icon icon="plus" />}
			onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
		>
			{t(Marketplace.ADD_RESOURCE_REQUEST_LINK)}
		</Button>
	);

	return (
		<Flex gap="20" align="start">
			<Card className={styles.main} withOutsideShadow>
				<Flex className={styles.header}>
					<Text variant={titleVariant} isMainTitle className={styles.text}>
						{title}
					</Text>
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						{suggestButton}
					</Flex>
				</Flex>
				{hasResources ? (
					<MyResourcesList resources={resources} />
				) : hasFilters ? (
					<EmptyFilterStub resetFilters={onResetFilters}></EmptyFilterStub>
				) : (
					<EmptyStub
						text={t(Marketplace.MY_RESOURCES_EMPTY_DESCRIPTION)}
						buttonText={t(Marketplace.MY_RESOURCES_EMPTY_BUTTON)}
						onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
					/>
				)}
				<MyResourcesPagination
					resourcesResponse={resourcesResponse}
					currentPage={filters.page ?? 1}
					onChangePage={onChangePage}
				/>
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default MyResourcesPage;
