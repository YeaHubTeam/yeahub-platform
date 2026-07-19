import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { SelectedAdminEntities, useModal } from '@/shared/libs';

import { BlockerDialog } from '../BlockerDialogModal';
import { Button } from '../Button';

interface RemoveButtonProps<T extends string | number> {
	toRemove: SelectedAdminEntities<T>;
	removeElements: () => Promise<void>;
}

export const RemoveButton = <T extends string | number>({
	toRemove,
	removeElements,
}: RemoveButtonProps<T>) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isOpen, onOpen, onClose } = useModal();
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
					onOk={removeElements}
					onCancel={onClose}
					message={modalMessage}
				/>
			)}
		</>
	);
};
