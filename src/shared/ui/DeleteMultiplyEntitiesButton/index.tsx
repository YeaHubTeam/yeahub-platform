import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { SelectedAdminEntities, useAppDispatch, useModal } from '@/shared/libs';

import { BlockerDialog } from '../BlockerDialogModal';
import { Button } from '../Button';

interface DeleteMultiplyEntitiesButtonProps<T extends string | number> {
	toRemove: SelectedAdminEntities<T>;
	onDeleteElements: ReturnType<typeof createAsyncThunk<void, SelectedAdminEntities<T>>>;
	onSuccess?: () => void;
}

export const DeleteMultiplyEntitiesButton = <T extends string | number>({
	toRemove,
	onDeleteElements,
	onSuccess,
}: DeleteMultiplyEntitiesButtonProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);
	const dispatch = useAppDispatch();

	const { isOpen, onOpen, onClose } = useModal();

	const onDelete = async () => {
		await dispatch(onDeleteElements(toRemove)).unwrap();
		onSuccess?.();
	};

	const modalMessage = t(Translation.MODAL_DELETE_CONFIRMATION, { count: toRemove.length });

	return (
		<>
			<Button onClick={onOpen} variant="destructive-outline" size="large">
				{t(Translation.REMOVE_SELECTED)}
			</Button>

			{isOpen && (
				<BlockerDialog
					isOpen={isOpen}
					onClose={onClose}
					onOk={onDelete}
					onCancel={onClose}
					message={modalMessage}
				/>
			)}
		</>
	);
};
