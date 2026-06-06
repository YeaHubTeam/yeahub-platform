import { DeleteButton } from '@/shared/ui/DeleteButton';

import { useDeleteTaskMutation } from '../../api/deleteTaskApi';

export interface DeleteTaskButtonProps {
	taskId: string;
	isDetailPage?: boolean;
}

export const DeleteTaskButton = ({ taskId, isDetailPage = false }: DeleteTaskButtonProps) => {
	const [deleteTaskMutation] = useDeleteTaskMutation();

	const onDeleteTask = () => {
		deleteTaskMutation(taskId);
	};

	return <DeleteButton onDelete={onDeleteTask} isDetailPage={isDetailPage} showTooltip={false} />;
};
