/* eslint-disable prettier/prettier */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { i18Namespace, ReferralLinks } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetReferralLinksListQuery } from '@/entities/referralLink';

import { useReferralLinksFilters } from '@/features/referralLinks/filterReferralLinks';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { getSelectedReferralLinks } from '../../model/selectors/referralLinksPageSelectors';
import { referralLinksPageActions } from '../../model/slices/referralLinksPageSlice';
import { ReferralLinksTable } from '../ReferralLinksTable/ReferralLinksTable';

export const ReferralLinksPage = () => {
	const dispatch = useAppDispatch();
	const selectedReferralLinks = useSelector(getSelectedReferralLinks);
	const { t } = useTranslation(i18Namespace.referralLink);

	const { filters, hasFilters, onChangePage } = useReferralLinksFilters({
		page: 1,
	});

	const { data, isLoading, isError, refetch } = useGetReferralLinksListQuery({
		page: filters.page,
		limit: 10,
	});

	const referralLinks = data?.data ?? [];
	const hasReferralLinks = referralLinks.length > 0;

	console.log('DATA: ', referralLinks);

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
		error: {
			onClick: refetch,
		},
	};

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
				page: filters.page,
				onChangePage,
				limit: 10,
				total: data?.total ?? 0,
			}}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						onSearch={() => String(onChangePage)}
						searchValue={filters.page + ''}
						hasFilters={hasFilters}
						renderFilter={() => <div>DIV DIV</div>}
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
