import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleSpecializationsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSpecializationsButtonProps {
	specializationsToRemove: SelectedAdminEntities;
}

export const DeleteSpecializationsButton = ({
	specializationsToRemove,
}: DeleteSpecializationsButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={specializationsToRemove}
			onDeleteElements={deleteMultipleSpecializationsThunk}
		/>
	);
};
