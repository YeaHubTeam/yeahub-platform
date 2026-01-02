import { Navigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { useGetCompanyByIdQuery } from '@/entities/company';
import { getIsAuthor, getUserId } from '@/entities/profile';

import { CompanyEditForm } from '../CompanyEditForm/CompanyEditForm';

const CompanyEditPage = () => {
	const { companyId } = useParams<{ companyId: string }>();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });
	const userId = useAppSelector(getUserId);
	const isAuthor = useAppSelector(getIsAuthor);

	if (isAuthor && company && company.createdBy?.id !== userId) {
		return <Navigate to={ROUTES.admin.collections.page} />;
	}

	if (!company) {
		return null;
	}
	return <CompanyEditForm company={company} />;
};

export default CompanyEditPage;
