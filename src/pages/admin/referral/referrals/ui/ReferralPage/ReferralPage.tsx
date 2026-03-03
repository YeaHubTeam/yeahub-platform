import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Referrals, ROUTES } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetReferralsListQuery } from '@/entities/referrals';

import { useReferralsFilters } from '@/features/referral/filterReferrals';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { getSelectedReferrals } from '../../model/selectors/referralsPageSelectors';
import { referralsPageActions } from '../../model/slices/referralsPageSlice';
import { ReferralTable } from '../ReferralTable/ReferralTable';

export const ReferralPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const selectedReferrals = useSelector(getSelectedReferrals);
	const { t } = useTranslation(i18Namespace.referral);

	const { filters, hasFilters, onChangePage } = useReferralsFilters({
		page: 1,
	});

	const { data, isLoading, isError, refetch } = useGetReferralsListQuery({
		page: filters.page,
		limit: 10,
	});

	const referrals = data?.data ?? [];
	const hasReferrals = referrals.length > 0;

	const onSelectReferrals = (ids: SelectedAdminEntities<string>) => {
		dispatch(referralsPageActions.setSelectedReferrals(ids));
	};

	const content = hasReferrals ? (
		<ReferralTable
			referrals={referrals}
			selectedReferrals={selectedReferrals}
			onSelectReferrals={onSelectReferrals}
		/>
	) : null;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Referrals.STUB_EMPTY_REFERRALS_TITLE),
			subtitle: t(Referrals.STUB_EMPTY_REFERRALS_SUBTITLE),
			buttonText: t(Referrals.STUB_EMPTY_REFERRALS_SUBMIT),
			onClick: () => navigate(ROUTES.admin.referrals.create.page),
		},
		error: {
			title: t(Referrals.STUB_ERROR_REFERRALS_TITLE),
			subtitle: t(Referrals.STUB_ERROR_REFERRALS_SUBTITLE),
			buttonText: t(Referrals.STUB_ERROR_REFERRALS_SUBMIT),
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasReferrals}
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
					<Card>
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};
