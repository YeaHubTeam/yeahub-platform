import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

interface DeleteQuestionButtonProps {
	questionId: Question['id'];
	isDetailPage?: boolean;
}

export const DeleteQuestionButton = ({
	questionId,
	isDetailPage = false,
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
			<Button
				aria-label="Large"
				style={{ width: 'auto', justifyContent: isDetailPage ? 'center' : 'flex-start' }}
				preffix={!isDetailPage && <Icon icon="trash" size={20} color="--palette-ui-red-600" />}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={handleOpenModal}
			>
				{t(Translation.DELETE)}
			</Button>
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
