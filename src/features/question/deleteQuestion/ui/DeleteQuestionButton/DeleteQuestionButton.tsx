import { useState } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { Question } from '@/entities/question';

import { useDeleteQuestionMutation } from '../../api/deleteQuestionApi';
import { deleteQuestionModal } from '../../model/constants/deleteQuestionConstants';

interface DeleteQuestionButtonProps {
	questionId: Question['id'];
	isDetailPage?: boolean;
}

export const DeleteQuestionButton = ({
	questionId,
	isDetailPage = false,
}: DeleteQuestionButtonProps) => {
	const [deleteQuestionMutation] = useDeleteQuestionMutation();
	const { t } = useI18nHelpers(i18Namespace.translation);
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
				preffix={!isDetailPage && <Icon icon="trash" size={20} color="--palette-ui-red-600" />}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={onCloseDeleteModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					onOk={onDeleteQuestion}
					onCancel={() => setIsModalOpen(false)}
					message={deleteQuestionModal}
				/>
			)}
		</>
	);
};
