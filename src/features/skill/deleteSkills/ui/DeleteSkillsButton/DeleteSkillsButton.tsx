import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleSkillsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSkillsButtonProps {
	skillsToRemove: SelectedAdminEntities;
}

export const DeleteSkillsButton = ({ skillsToRemove }: DeleteSkillsButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={skillsToRemove}
			onDeleteElements={deleteMultipleSkillsThunk}
		/>
	);
};
