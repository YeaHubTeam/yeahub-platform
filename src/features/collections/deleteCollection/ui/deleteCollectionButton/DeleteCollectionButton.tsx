import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { Collection } from '@/entities/collection';

import { useDeleteCollectionMutation } from '../../api/deleteCollectionApi';

interface DeleteCollectionButtonProps {
	collectionId: Collection['id'];
	isDetailPage?: boolean;
}

export const DeleteCollectionButton = ({
	collectionId,
	isDetailPage = false,
}: DeleteCollectionButtonProps) => {
	const [deleteCollectionMutation] = useDeleteCollectionMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteCollection = async () => {
		try {
			await deleteCollectionMutation(collectionId);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{
					width: isDetailPage ? 'auto' : '100%',
					padding: isDetailPage ? '0 32px' : '6px 10px',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				preffix={!isDetailPage && <Icon icon="trash" size={20} />}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={handleOpenModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteCollection}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
