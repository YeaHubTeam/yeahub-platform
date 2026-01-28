import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { route, useAppSelector } from '@/shared/libs';

import { useGetCompanyByIdQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { CompanyEditForm } from '@/features/company/editCompany';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const CompanyEditPage = () => {
	const { companyId } = useParams<{ companyId: string }>();
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	const {
		data: company,
		isLoading,
		isError,
		refetch,
	} = useGetCompanyByIdQuery({ companyId: companyId! });

	const hasCompany = company && Object.keys(company).length > 0;

	if (hasCompany && isAuthor && company.createdBy?.id !== userId) {
		return <Navigate to={route(ROUTES.admin.companies.page)} />;
	}

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasCompany ? <CompanyEditForm company={company} /> : null;

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
