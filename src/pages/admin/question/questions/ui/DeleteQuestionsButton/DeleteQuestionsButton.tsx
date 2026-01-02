import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleQuestionsThunk } from '../../lib/thunks/deleteMultipleQuestionsThunk';

interface DeleteQuestionsButtonProps {
	questionsToRemove: SelectedAdminEntities;
}

export const DeleteQuestionsButton = ({ questionsToRemove }: DeleteQuestionsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveQuestions = async () => {
		await dispatch(deleteMultipleQuestionsThunk(questionsToRemove));
	};

	return (
		<Button onClick={onRemoveQuestions} variant="destructive-tertiary">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
