import { Translation } from '@/shared/config';
import { DeleteButton } from '@/shared/ui/DeleteButton';

import { Company } from '@/entities/company';

import { useDeleteCompanyMutation } from '../../api/deleteCompanyApi';

export interface DeleteCompanyButtonProps {
	companyId: Company['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteCompanyButton = ({
	companyId,
	isDetailPage = false,
	disabled = false,
}: DeleteCompanyButtonProps) => {
	const [deleteCompanyMutation] = useDeleteCompanyMutation();

	const onDeleteCompany = () => {
		deleteCompanyMutation(companyId);
	};

	return (
		<DeleteButton
			onDelete={onDeleteCompany}
			isDetailPage={isDetailPage}
			disabled={disabled}
			tooltipTitle={Translation.TOOLTIP_COMPANY_DISABLED_INFO}
		/>
	);
};
