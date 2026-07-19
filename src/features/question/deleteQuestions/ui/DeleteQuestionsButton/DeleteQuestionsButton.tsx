import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleQuestionsThunk } from '../../model/thunks/deleteMultipleQuestionsThunk';

interface DeleteQuestionsButtonProps {
	questionsToRemove: SelectedAdminEntities;
}

export const DeleteQuestionsButton = ({ questionsToRemove }: DeleteQuestionsButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveQuestions = async () => {
		await dispatch(deleteMultipleQuestionsThunk(questionsToRemove));
	};

	return <RemoveButton toRemove={questionsToRemove} removeElements={onRemoveQuestions} />;
};
