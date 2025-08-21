import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { Resource } from '@/entities/resource';

import { useDeleteResourceMutation } from '../../api/deleteResourceApi';

interface DeleteResourceButtonProps {
	resourceId: Resource['id'];
	isDetailPage?: boolean;
	disabled?: boolean;
}

export const DeleteResourceButton = ({
	resourceId,
	isDetailPage = false,
	disabled = false,
}: DeleteResourceButtonProps) => {
	const [deleteResourceMutation] = useDeleteResourceMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const onDeleteResource = async () => {
		try {
			await deleteResourceMutation(resourceId);
			handleCloseModal();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button
				disabled={disabled}
				aria-label="Large"
				style={{
					width: isDetailPage ? 'auto' : '100%',
					padding: isDetailPage ? '0 32px' : '6px 10px',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				variant={isDetailPage ? 'destructive' : 'tertiary-link'}
				onClick={handleOpenModal}
				preffix={isDetailPage ? undefined : <Icon icon="trash" size={24} />}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteResource}
					onCancel={handleCloseModal}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
