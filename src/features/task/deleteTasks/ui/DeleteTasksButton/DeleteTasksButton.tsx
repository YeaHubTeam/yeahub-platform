import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleTasksThunk } from '../../model/thunks/deleteMultipleTasksThunk';

interface DeleteTasksButtonProps {
	tasksToRemove: SelectedAdminEntities<string>;
	onSuccess: () => void;
}

export const DeleteTasksButton = ({ tasksToRemove, onSuccess }: DeleteTasksButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveTasks = async () => {
		await dispatch(deleteMultipleTasksThunk(tasksToRemove)).unwrap();

		onSuccess?.();
	};

	return (
		<Button onClick={onRemoveTasks} variant="destructive-outline" size="large">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
