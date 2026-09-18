import { Translation } from '@/shared/config';
import { HeaderAdminPageDetailCard } from '@/shared/ui/HeaderAdminPageDetailCard';

import { type Company, CompanyCard } from '@/entities/company';

import { useDeleteCompanyMutation } from '@/features/company/deleteCompany';

interface CompanyDetailPageContentProps {
	company: Company;
	isDisabled: boolean;
}

const CompanyDetailPageContent = ({ company, isDisabled }: CompanyDetailPageContentProps) => {
	const [deleteCompany] = useDeleteCompanyMutation();

	const handleDeleteCompany = () => {
		void deleteCompany(company.id);
	};

	return (
		<>
			<HeaderAdminPageDetailCard
				onDelete={handleDeleteCompany}
				isDisabled={isDisabled}
				deleteButtonProps={{ tooltipTitle: Translation.TOOLTIP_COMPANY_DISABLED_INFO }}
			/>
			<CompanyCard company={company} />
		</>
	);
};

export default CompanyDetailPageContent;
