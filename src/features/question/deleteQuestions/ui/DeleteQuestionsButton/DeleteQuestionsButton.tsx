import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SelectedAdminEntities } from '@/shared/types/types';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleQuestionsThunk } from '../../model/thunks/deleteMultipleQuestionsThunk';

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
