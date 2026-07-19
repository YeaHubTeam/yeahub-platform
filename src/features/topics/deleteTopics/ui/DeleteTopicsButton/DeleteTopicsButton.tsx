import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { RemoveButton } from '@/shared/ui/RemoveButton';

import { deleteMultipleTopicsThunk } from '../../model/thunks/deleteMultipleTopicsThunk';

interface DeleteTopicsButtonProps {
	topicsToRemove: SelectedAdminEntities;
	onSuccess?: () => void;
}

export const DeleteTopicsButton = ({ topicsToRemove, onSuccess }: DeleteTopicsButtonProps) => {
	const dispatch = useAppDispatch();

	const onRemoveTopics = async () => {
		await dispatch(deleteMultipleTopicsThunk(topicsToRemove)).unwrap();
		onSuccess?.();
	};

	return <RemoveButton toRemove={topicsToRemove} removeElements={onRemoveTopics} />;
};
