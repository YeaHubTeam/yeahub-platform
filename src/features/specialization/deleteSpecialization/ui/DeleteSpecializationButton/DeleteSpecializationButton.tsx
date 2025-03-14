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

	const onCloseDeleteModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const onDeleteSpecialization = async () => {
		await deleteSpecializationMutation(specializationId);
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
				onClick={onCloseDeleteModal}
			>
				{t(Translation.DELETE)}
			</Button>
			{isDeleteModalOpen && (
				<BlockerDialog
					onOk={onDeleteSpecialization}
					onCancel={() => setIsModalOpen(false)}
					message={Translation.MODAL_DELETE_TITLE}
				/>
			)}
		</>
	);
};
