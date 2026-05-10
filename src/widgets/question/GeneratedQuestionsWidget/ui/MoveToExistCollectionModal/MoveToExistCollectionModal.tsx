import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Questions, ROUTES } from '@/shared/config';
import { route } from '@/shared/libs';
import { Modal } from '@/shared/ui/Modal';

import { CollectionSelect } from '@/entities/collection';

interface MoveToExistCollectionModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const MoveToExistCollectionModal = ({
	isOpen,
	onClose,
}: MoveToExistCollectionModalProps) => {
	const { t } = useTranslation(i18Namespace.questions);
	const navigate = useNavigate();
	const [collectionId, setCollectionId] = useState<string>('');

	const onMoveToExistCollection = () =>
		navigate(
			route(`${ROUTES.admin.collections.edit.page}?withGeneratedQuestions=true`, collectionId),
		);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t(Questions.MODAL_MOVE_TO_EXIST_COLLECTION_TITLE)}
			buttonPrimaryText={t(Questions.MODAL_MOVE_TO_EXIST_COLLECTION_BUTTON_OK)}
			buttonOutlineText={t(Questions.MODAL_MOVE_TO_EXIST_COLLECTION_BUTTON_CANCEL)}
			buttonPrimaryClick={onMoveToExistCollection}
			buttonOutlineClick={onClose}
			buttonPrimaryDisabled={!collectionId}
		>
			<CollectionSelect value={collectionId} onChange={setCollectionId} />
		</Modal>
	);
};
