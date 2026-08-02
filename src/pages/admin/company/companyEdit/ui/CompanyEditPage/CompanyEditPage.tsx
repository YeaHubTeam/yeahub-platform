import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Companies, i18Namespace, ROUTES } from '@/shared/config';

import { useGetCompanyByIdQuery } from '@/entities/company';

import { CompanyEditForm } from '@/features/company/editCompany';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
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
		<EditAccessGuard
			authorId={company.createdBy?.id}
			redirectTo={ROUTES.admin.companies.page}
			titleStub={t(Companies.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Companies.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Companies.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<CompanyEditForm company={company} />
		</EditAccessGuard>
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
