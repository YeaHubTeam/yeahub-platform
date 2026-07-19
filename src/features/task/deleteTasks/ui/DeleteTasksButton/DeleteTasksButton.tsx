import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleTasksThunk } from '../../model/thunks/deleteMultipleTasksThunk';

interface DeleteTasksButtonProps {
	tasksToRemove: SelectedAdminEntities<string>;
	onSuccess: () => void;
}

export const DeleteTasksButton = ({ tasksToRemove, onSuccess }: DeleteTasksButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveTasks = async () => {
		await dispatch(deleteMultipleTasksThunk(tasksToRemove)).unwrap();
		onSuccess?.();
	};

	return <RemoveButton toRemove={tasksToRemove} removeElements={onRemoveTasks} />;
};
