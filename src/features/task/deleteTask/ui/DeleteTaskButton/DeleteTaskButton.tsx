import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { useDeleteTaskMutation } from '../../api/deleteTaskApi';

export interface DeleteTaskButtonProps {
	taskId: string;
	isDetailPage?: boolean;
}

export const DeleteTaskButton = ({ taskId, isDetailPage = false }: DeleteTaskButtonProps) => {
	const [deleteTaskMutation] = useDeleteTaskMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteTask = async () => {
		try {
			await deleteTaskMutation(taskId);
			handleCloseModal();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{
					width: isDetailPage ? 'auto' : '100%',
					padding: isDetailPage ? '0 32px' : '6px 10px',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				preffix={!isDetailPage && <Icon icon="trash" size={24} />}
				variant={isDetailPage ? 'destructive' : 'tertiary-link'}
				onClick={handleOpenModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteTask}
					onCancel={handleCloseModal}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
