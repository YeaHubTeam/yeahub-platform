import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleSpecializationsThunk } from '../../model/thunks/deleteMultipleSkillsThunk';

interface DeleteSpecializationsButtonProps {
	specializationsToRemove: SelectedAdminEntities;
}

export const DeleteSpecializationsButton = ({
	specializationsToRemove,
}: DeleteSpecializationsButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveSpecializations = async () => {
		await dispatch(deleteMultipleSpecializationsThunk(specializationsToRemove));
	};

	return (
		<RemoveButton toRemove={specializationsToRemove} removeElements={onRemoveSpecializations} />
	);
};
