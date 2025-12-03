import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { EmptyFilterStub } from '@/shared/ui/EmptyFilterStub';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Stub } from '@/shared/ui/Stub';
import { TablePagination } from '@/shared/ui/TablePagination';
import { Text } from '@/shared/ui/Text';

import { getIsVerified } from '@/entities/profile';
import { ResourceRequestStatus, useGetMyRequestsResourcesQuery } from '@/entities/resource';

import {
	ResourceRequestsFilters,
	useResourceRequestsFilters,
} from '@/features/resources/filterResourceRequests';

import { MyResourcesList } from '@/widgets/Marketplace';

import styles from './MyResourcesPage.module.css';
import { MyResourcesPageSkeleton } from './MyResourcesPage.skeleton';

const MyResourcesPage = () => {
	const { isMobile, isTablet, isMobileS } = useScreenSize();
	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.translation]);

	const navigate = useNavigate();
	const isEmailVerified = useAppSelector(getIsVerified);

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
		onChangeSkills,
	} = useResourceRequestsFilters({ status: 'all', page: 1 });

	const {
		data: resourcesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetMyRequestsResourcesQuery({
		page: filters.page ?? 1,
		status: filters.status !== 'all' ? (filters.status as ResourceRequestStatus) : undefined,
		search: filters.title,
		types: filters.types,
		skills: filters.skills,
	});

	const titleVariant = isMobileS ? 'body5-accent' : 'body6';

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	if (isLoading) {
		return <MyResourcesPageSkeleton />;
	}

	const renderFilters = () => (
		<ResourceRequestsFilters
			filters={filters}
			onChangeTitle={onChangeTitle}
			onChangeTypes={onChangeTypes}
			onChangeStatus={onChangeStatus}
			onChangeSkills={onChangeSkills}
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
						{t(Marketplace.MY_RESOURCES)}
					</Text>
					<Flex gap="12" align="center">
						{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
						{suggestButton}
					</Flex>
				</Flex>
				{isError ? (
					<Stub type="error" onClick={refetch} />
				) : (
					<>
						{resourcesResponse && (
							<>
								<MyResourcesList resources={resources} />
								<TablePagination
									page={filters.page || 1}
									onChangePage={onChangePage}
									limit={resourcesResponse.limit}
									total={resourcesResponse.total}
								/>
							</>
						)}
						{!hasResources && hasFilters && <EmptyFilterStub resetFilters={onResetFilters} />}
						{!hasResources && !hasFilters && (
							<Stub
								type="empty"
								subtitle={t(Marketplace.MY_RESOURCES_EMPTY_DESCRIPTION)}
								title={t(Marketplace.MY_RESOURCES_EMPTY_TITLE)}
								buttonText={t(Marketplace.MY_RESOURCES_EMPTY_BUTTON)}
								onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
							/>
						)}
					</>
				)}
			</Card>
			<Card className={styles.filters}>{renderFilters()}</Card>
		</Flex>
	);
};

export default MyResourcesPage;
