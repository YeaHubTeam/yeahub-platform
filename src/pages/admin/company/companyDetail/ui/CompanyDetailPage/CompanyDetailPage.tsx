import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import { i18Namespace, ROUTES, Translation, Companies } from '@/shared/config';
import { route, useAppSelector } from '@/shared/libs';
import { BackButton } from '@/shared/ui/BackButton';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Tooltip } from '@/shared/ui/Tooltip';

import { CompanyCard, useGetCompanyByIdQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { DeleteCompanyButton } from '@/features/company/deleteCompany';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const CompanyDetailPage = () => {
	const { t } = useTranslation(i18Namespace.translation);
	const { t: tCompanies } = useTranslation(i18Namespace.companies);

	const { companyId } = useParams();
	const {
		data: company,
		isLoading,
		isError,
		refetch,
	} = useGetCompanyByIdQuery({ companyId: companyId! });
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const isDisabled = isAuthor && company?.createdBy?.id !== userId;

	const stubs: PageWrapperStubs = {
		empty: {
			title: tCompanies(Companies.STUB_EMPTY_COMPANY_TITLE),
			subtitle: tCompanies(Companies.STUB_EMPTY_COMPANY_SUBTITLE),
			buttonText: tCompanies(Companies.STUB_EMPTY_COMPANY_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	const content = company ? (
		<main>
			<Flex align="center" justify="between" gap="8" style={{ marginBottom: 24 }}>
				<BackButton />
				<Flex gap="16">
					<Tooltip
						title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
						color="red"
						placement="bottom-start"
						shouldShowTooltip={isDisabled}
					>
						<DeleteCompanyButton companyId={company.id} isDetailPage disabled={isDisabled} />
					</Tooltip>
					<Tooltip
						title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
						color="red"
						placement="bottom-start"
						shouldShowTooltip={isDisabled}
					>
						<NavLink to={route(ROUTES.admin.companies.edit.page, company.id)}>
							<Button disabled={isDisabled}>{t(Translation.EDIT)}</Button>
						</NavLink>
					</Tooltip>
				</Flex>
			</Flex>
			<CompanyCard company={company} />
		</main>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!!company}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CompanyDetailPage;
