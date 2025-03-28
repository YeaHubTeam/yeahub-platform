import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';

export interface DeleteQuestionButtonProps {
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

	const onCloseDeleteModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const onDeleteQuestion = async () => {
		await deleteQuestionMutation(questionId);
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{ width: 'auto', justifyContent: isDetailPage ? 'center' : 'flex-start' }}
				preffix={!isDetailPage && <Icon icon="trash" size={20} color="red-600" />}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={onCloseDeleteModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					onOk={onDeleteQuestion}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
