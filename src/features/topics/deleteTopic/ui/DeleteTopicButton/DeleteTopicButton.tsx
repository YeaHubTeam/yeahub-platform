import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { Topic } from '@/entities/topic';

import { useDeleteTopicMutation } from '../../api/deleteTopicApi';

export interface DeleteTopicButtonProps {
	topicId: Topic['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteTopicButton = ({
	topicId,
	isDetailPage = false,
	disabled = false,
}: DeleteTopicButtonProps) => {
	const [deleteTopicMutation] = useDeleteTopicMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const onDeleteTopic = async () => {
		try {
			await deleteTopicMutation(topicId);
			handleCloseModal();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<>
			<Tooltip
				title={t(Translation.TOOLTIP_COLLECTION_DISABLED_INFO)}
				placement={isDetailPage ? 'bottom-start' : 'left'}
				color="red"
				offsetTooltip={10}
				shouldShowTooltip={disabled}
			>
				<Button
					disabled={disabled}
					aria-label="Large"
					style={{
						width: isDetailPage ? 'auto' : '100%',
						padding: isDetailPage ? '0 32px' : '6px 10px',
						justifyContent: isDetailPage ? 'center' : 'flex-start',
					}}
					variant={isDetailPage ? 'destructive' : 'tertiary-link'}
					onClick={handleOpenModal}
					preffix={isDetailPage ? undefined : <Icon icon="trash" size={24} />}
				>
					{t(Translation.DELETE)}
				</Button>
			</Tooltip>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteTopic}
					onCancel={handleCloseModal}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
