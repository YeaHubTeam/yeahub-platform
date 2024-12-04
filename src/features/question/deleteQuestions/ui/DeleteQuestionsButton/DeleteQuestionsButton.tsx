import { useState } from 'react';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { SelectedAdminEntities } from '@/shared/types/types';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleQuestionsThunk } from '../../model/thunks/deleteMultipleQuestionsThunk';

interface DeleteQuestionsButtonProps {
	questionsToRemove: SelectedAdminEntities;
}

export const DeleteQuestionsButton = ({ questionsToRemove }: DeleteQuestionsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useI18nHelpers(i18Namespace.translation);
	const [isModalOpen, setModalOpen] = useState(false);

	const onRemoveQuestions = async () => {
		await dispatch(deleteMultipleQuestionsThunk(questionsToRemove));
	};

	return (
		<>
			<Button onClick={onRemoveQuestions} variant="destructive-tertiary">
				{t(Translation.REMOVE_SELECTED)}
			</Button>
			{isModalOpen && (
				<BlockerDialog onOk={onRemoveQuestions} onCancel={() => setModalOpen(!isModalOpen)} />
			)}
		</>
	);
};
