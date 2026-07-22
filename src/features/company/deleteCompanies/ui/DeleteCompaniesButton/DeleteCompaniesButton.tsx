import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleCompaniesThunk } from '../../model/thunks/deleteMultipleCompaniesThunk';

interface DeleteCompaniesButtonProps {
	companiesToRemove: SelectedAdminEntities<string>;
}

export const DeleteCompaniesButton = ({ companiesToRemove }: DeleteCompaniesButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={companiesToRemove}
			onDeleteElements={deleteMultipleCompaniesThunk}
		/>
	);
};
