import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Companies, i18Namespace, ROUTES } from '@/shared/config';

import { useGetCompanyByIdQuery } from '@/entities/company';

import { CompanyEditForm } from '@/features/company/editCompany';

import { AuthorEditRestriction } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const CompanyEditPage = () => {
	const { t } = useTranslation(i18Namespace.companies);
	const { companyId = '' } = useParams<{ companyId: string }>();

	const { data: company, isLoading, isError, refetch } = useGetCompanyByIdQuery({ companyId });

	const hasCompany = company && Object.keys(company).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasCompany ? (
		<AuthorEditRestriction
			authorId={company.createdBy?.id}
			redirectTo={ROUTES.admin.companies.page}
			titleStub={t(Companies.STUB_EDIT_COMPANY_TITLE)}
			subtitleStub={t(Companies.STUB_EDIT_COMPANY_SUBTITLE)}
			buttonTextStub={t(Companies.STUB_EDIT_COMPANY_SUBMIT)}
		>
			<CompanyEditForm company={company} />
		</AuthorEditRestriction>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasCompany}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default CompanyEditPage;
