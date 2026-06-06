import { DeleteButton } from '@/shared/ui/DeleteButton';

import { useDeleteTaskMutation } from '../../api/deleteTaskApi';

export interface DeleteTaskButtonProps {
	taskId: string;
	isDetailPage?: boolean;
}

export const DeleteTaskButton = ({ taskId, isDetailPage = false }: DeleteTaskButtonProps) => {
	const [deleteTaskMutation] = useDeleteTaskMutation();

	const onDeleteTask = async (id: string) => {
		await deleteTaskMutation(id).unwrap();
	};

	return (
		<DeleteButton
			id={taskId}
			onDelete={onDeleteTask}
			isDetailPage={isDetailPage}
			showTooltip={false}
		/>
	);
};
