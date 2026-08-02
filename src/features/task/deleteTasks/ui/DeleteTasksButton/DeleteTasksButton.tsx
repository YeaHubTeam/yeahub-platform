import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleTasksThunk } from '../../model/thunks/deleteMultipleTasksThunk';

interface DeleteTasksButtonProps {
	tasksToRemove: SelectedAdminEntities<string>;
	onSuccess: () => void;
}

export const DeleteTasksButton = ({ tasksToRemove, onSuccess }: DeleteTasksButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={tasksToRemove}
			onDeleteElements={deleteMultipleTasksThunk}
			onSuccess={onSuccess}
		/>
	);
};
