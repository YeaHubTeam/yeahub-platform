import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, ROUTES } from '@/shared/config';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { FiltersDrawer } from '@/shared/ui/FiltersDrawer';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { getIsVerified } from '@/entities/profile';
import { ResourceRequestStatus, useGetMyRequestsResourcesQuery } from '@/entities/resource';

import {
	ResourceRequestsFilters,
	useResourceRequestsFilters,
} from '@/features/resources/filterResourceRequests';

import { MyResourcesList } from '@/widgets/Marketplace';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

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
	} = useGetMyRequestsResourcesQuery(
		{
			page: filters.page ?? 1,
			status: filters.status !== 'all' ? (filters.status as ResourceRequestStatus) : undefined,
			search: filters.title,
			types: filters.types,
			skills: filters.skills,
		},
		{
			skip: !isEmailVerified,
		},
	);

	const titleVariant = isMobileS ? 'body5-accent' : 'body6';

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	const renderFilters = () => (
		<ResourceRequestsFilters
			filters={filters}
			onChangeTitle={onChangeTitle}
			onChangeTypes={onChangeTypes}
			onChangeStatus={onChangeStatus}
			onChangeSkills={onChangeSkills}
		/>
	);

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
		empty: {
			subtitle: t(Marketplace.MY_RESOURCES_EMPTY_DESCRIPTION),
			title: t(Marketplace.MY_RESOURCES_EMPTY_TITLE),
			buttonText: t(Marketplace.MY_RESOURCES_EMPTY_BUTTON),
			onClick: () => navigate(ROUTES.wiki.resources.my.create.page),
		},
	};

	return (
		<>
			<PageWrapper
				isLoading={isLoading}
				skeleton={<MyResourcesPageSkeleton />}
				hasVerification={isEmailVerified}
				hasError={isError}
				hasFilters={hasFilters}
				hasData={hasResources}
				paginationOptions={{
					page: filters.page || 1,
					limit: resourcesResponse?.limit || 0,
					total: resourcesResponse?.total || 0,
					onChangePage,
				}}
				stubs={stubs}
				content={<MyResourcesList resources={resources} />}
			>
				{({ content, pagination }) => (
					<Flex gap="20" align="start">
						<Card className={styles.main} withOutsideShadow>
							<Flex className={styles.header}>
								<Text variant={titleVariant} isMainTitle className={styles.text}>
									{t(Marketplace.MY_RESOURCES)}
								</Text>
								<Flex gap="12" align="center">
									{(isMobile || isTablet) && <FiltersDrawer>{renderFilters()}</FiltersDrawer>}
									<Button
										variant="link-purple"
										suffix={<Icon icon="plus" />}
										onClick={() => navigate(ROUTES.wiki.resources.my.create.page)}
									>
										{t(Marketplace.ADD_RESOURCE_REQUEST_LINK)}
									</Button>
								</Flex>
							</Flex>
							<>
								{content}
								{pagination}
							</>
						</Card>
						<Card className={styles.filters}>{renderFilters()}</Card>
					</Flex>
				)}
			</PageWrapper>
		</>
	);
};

export default MyResourcesPage;
