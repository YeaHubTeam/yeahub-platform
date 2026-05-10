import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { getUserId } from '@/entities/profile';
import { useGetReferralLinksListQuery } from '@/entities/referralLink';

import {
	RefferalLinksFilters,
	useReferralLinksFilters,
} from '@/features/referralLinks/filterReferralLinks';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedReferralLinks } from '../../model/selectors/referralLinksPageSelectors';
import { referralLinksPageActions } from '../../model/slices/referralLinksPageSlice';
import { ReferralLinksTable } from '../ReferralLinksTable/ReferralLinksTable';

export const ReferralLinksPage = () => {
	const dispatch = useAppDispatch();
	const selectedReferralLinks = useSelector(getSelectedReferralLinks);
	const { t } = useTranslation(i18Namespace.referralLink);
	const userId = useSelector(getUserId);
	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeIsMy,
		onResetFilters,
		onChangeTitle,
		onChangeOwner,
		onChangeOrderBy,
		onChangeOrder,
	} = useReferralLinksFilters({
		page: 1,
	});
	const onResetAll = () => {
		dispatch(referralLinksPageActions.resetFilters());
		onResetFilters();
	};
	const { data, isLoading, isError, refetch } = useGetReferralLinksListQuery({
		page: filters.page,
		limit: 10,
		search: filters.title,
		ownerId: filters.isMy ? userId : filters.ownerId,
		sortBy: filters.orderBy,
		sortOrder: filters.order,
	});

	const referralLinks = data?.data ?? [];
	const hasReferralLinks = referralLinks.length > 0;

	const onSelectReferralLinks = (ids: SelectedAdminEntities<string>) => {
		dispatch(referralLinksPageActions.setSelectedReferralLinks(ids));
	};

	const content = hasReferralLinks ? (
		<ReferralLinksTable
			referralLinks={referralLinks}
			selectedReferralLinks={selectedReferralLinks}
			onSelectReferralLinks={onSelectReferralLinks}
		/>
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(ReferralLinks.STUB_EMPTY_REFERRAL_LINKS_TITLE),
			subtitle: t(ReferralLinks.STUB_EMPTY_REFERRAL_LINKS_SUBTITLE),
			buttonText: t(ReferralLinks.STUB_EMPTY_REFERRAL_LINKS_SUBMIT),
		},
		'filter-empty': {
			onClick: onResetAll,
			title: t(ReferralLinks.STUB_EMPTY_FILTER__TITLE),
			subtitle: t(ReferralLinks.STUB_EMPTY_FILTER_SUBTITLE),
			buttonText: t(ReferralLinks.STUB_EMPTY_FILTER_BUTTON),
		},
		error: {
			onClick: refetch,
		},
	};
	const shouldShowResetButton =
		hasFilters || (filters.title && filters.title.length > 0) || (filters.page ?? 0) > 1;
	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasReferralLinks}
			roles={['admin']}
			stubs={stubs}
			content={content}
			hasFilters={hasFilters}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: 10,
				total: data?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						hasFilters={hasFilters}
						searchValue={filters.title}
						onResetFilters={onResetAll}
						onSearch={onChangeTitle}
						showResetFilterButton={shouldShowResetButton}
						renderFilter={() => (
							<RefferalLinksFilters
								filter={filters}
								onChangeIsMy={onChangeIsMy}
								onChangeOwner={onChangeOwner}
								onChangeOrderBy={onChangeOrderBy}
								onChangeOrder={onChangeOrder}
							/>
						)}
					/>
					<Card>
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};
