import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useAppDispatch, SelectedAdminEntities } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';

import { deleteMultipleTopicsThunk } from '../../model/thunks/deleteMultipleTopicsThunk';

interface DeleteTopicsButtonProps {
	topicsToRemove: SelectedAdminEntities;
}

export const DeleteTopicsButton = ({ topicsToRemove }: DeleteTopicsButtonProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation(i18Namespace.translation);

	const onRemoveTopics = async () => {
		await dispatch(deleteMultipleTopicsThunk(topicsToRemove)).unwrap();
	};

	return (
		<Button onClick={onRemoveTopics} variant="destructive-outline">
			{t(Translation.REMOVE_SELECTED)}
		</Button>
	);
};
