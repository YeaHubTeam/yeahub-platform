import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';

import { Specialization } from '@/entities/specialization';

import { useDeleteSpecializationMutation } from '../../api/deleteSpecializationApi';

interface DeleteSpecializationButtonProps {
	specializationId: Specialization['id'];
	isDetailPage?: boolean;
}

export const DeleteSpecializationButton = ({
	specializationId,
	isDetailPage = false,
}: DeleteSpecializationButtonProps) => {
	const [deleteSpecializationMutation] = useDeleteSpecializationMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteSpecialization = async () => {
		try {
			await deleteSpecializationMutation(specializationId);
			handleCloseModal();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button
				aria-label="Large"
				style={{
					width: 'auto',
					justifyContent: isDetailPage ? 'center' : 'flex-start',
				}}
				preffix={
					isDetailPage ? undefined : <Icon icon="trash" size={20} color="--palette-ui-red-600" />
				}
				variant={isDetailPage ? 'destructive' : 'tertiary'}
				onClick={handleOpenModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteSpecialization}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
