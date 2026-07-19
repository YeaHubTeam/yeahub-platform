import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleCompaniesThunk } from '../../model/thunks/deleteMultipleCompaniesThunk';

interface DeleteCompaniesButtonProps {
	companiesToRemove: SelectedAdminEntities<string>;
}

export const DeleteCompaniesButton = ({ companiesToRemove }: DeleteCompaniesButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveCompanies = async () => {
		await dispatch(deleteMultipleCompaniesThunk(companiesToRemove));
	};

	return <RemoveButton toRemove={companiesToRemove} removeElements={onRemoveCompanies} />;
};
