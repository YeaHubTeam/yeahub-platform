import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Companies } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCompanyByIdQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import CompanyDetailPageContent from '../CompanyDetailPageContent/CompanyDetailPageContent';
import { CompanyDetailPageSkeleton } from '../CompanyDetailPageContent/CompanyDetailPageContent.skeleton';

const CompanyDetailPage = () => {
	const { t: tCompanies } = useTranslation(i18Namespace.companies);

	const { companyId = '' } = useParams();
	const { data: company, isLoading, isError, refetch } = useGetCompanyByIdQuery({ companyId });
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const isDisabled = isAuthor && company?.createdBy?.id !== userId;
	const hasData = !!company && Object.keys(company).length > 0;

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
		<CompanyDetailPageContent company={company} isDisabled={isDisabled} />
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			skeleton={<CompanyDetailPageSkeleton />}
			roles={['admin', 'author']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CompanyDetailPage;
