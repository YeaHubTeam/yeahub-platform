import { useParams } from 'react-router-dom';

import { useGetCompanyByIdQuery } from '@/entities/company';

import { CompanyEditForm } from '@/features/company/editCompany';

const CompanyEditPage = () => {
	const { companyId } = useParams<{ companyId: string }>();
	const { data: company } = useGetCompanyByIdQuery({ companyId: companyId! });

	if (!company) {
		return null;
	}
	return <CompanyEditForm company={company} />;
};

export default CompanyEditPage;
