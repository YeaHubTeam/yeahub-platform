import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleSkillsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSkillsButtonProps {
	skillsToRemove: SelectedAdminEntities;
}

export const DeleteSkillsButton = ({ skillsToRemove }: DeleteSkillsButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveSkills = async () => {
		await dispatch(deleteMultipleSkillsThunk(skillsToRemove));
	};

	return <RemoveButton toRemove={skillsToRemove} removeElements={onRemoveSkills} />;
};
