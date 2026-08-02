import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleQuestionsThunk } from '../../model/thunks/deleteMultipleQuestionsThunk';

interface DeleteQuestionsButtonProps {
	questionsToRemove: SelectedAdminEntities;
}

export const DeleteQuestionsButton = ({ questionsToRemove }: DeleteQuestionsButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={questionsToRemove}
			onDeleteElements={deleteMultipleQuestionsThunk}
		/>
	);
};
