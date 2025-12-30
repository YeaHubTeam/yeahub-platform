import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

export interface DeleteQuestionButtonProps {
	questionId: Question['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteQuestionButton = ({
	questionId,
	isDetailPage = false,
	disabled,
}: DeleteQuestionButtonProps) => {
	const [deleteQuestionMutation] = useDeleteQuestionMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteQuestion = async () => {
		try {
			await deleteQuestionMutation(questionId);
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
					aria-label="Large"
					style={{
						width: isDetailPage ? 'auto' : '100%',
						padding: isDetailPage ? '0 32px' : '6px 10px',
						justifyContent: isDetailPage ? 'center' : 'flex-start',
					}}
					preffix={!isDetailPage && <Icon icon="trash" size={24} />}
					variant={isDetailPage ? 'destructive' : 'tertiary-link'}
					onClick={handleOpenModal}
					disabled={disabled}
				>
					{t(Translation.DELETE)}
				</Button>
			</Tooltip>

			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteQuestion}
					onCancel={handleCloseModal}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
