import { SelectedAdminEntities } from '@/shared/libs';
import { DeleteMultiplyEntitiesButton } from '@/shared/ui/DeleteMultiplyEntitiesButton';

import { deleteMultipleTopicsThunk } from '../../model/thunks/deleteMultipleTopicsThunk';

interface DeleteTopicsButtonProps {
	topicsToRemove: SelectedAdminEntities;
	onSuccess?: () => void;
}

export const DeleteTopicsButton = ({ topicsToRemove, onSuccess }: DeleteTopicsButtonProps) => {
	return (
		<DeleteMultiplyEntitiesButton
			toRemove={topicsToRemove}
			onDeleteElements={deleteMultipleTopicsThunk}
			onSuccess={onSuccess}
		/>
	);
};
