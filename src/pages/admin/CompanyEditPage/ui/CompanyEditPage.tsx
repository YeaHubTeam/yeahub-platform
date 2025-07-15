import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';

import { useGetCompanyByIdQuery } from '@/entities/company';
import { getUserId } from '@/entities/profile';

import { CompanyEditForm } from '@/features/company/editCompany';

const CompanyEditPage = () => {
	const { companyId } = useParams<{ companyId: string }>();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });
	const userId = useAppSelector(getUserId);

	if (company && company.createdBy?.id !== userId) {
		return <Navigate to={ROUTES.admin.collections.page} />;
	}

	if (!company) {
		return null;
	}
	return <CompanyEditForm company={company} />;
};

export default CompanyEditPage;
