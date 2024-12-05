import { useState } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
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

	const { t } = useI18nHelpers(i18Namespace.translation);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onDelete = async () => {
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
				onClick={() => setIsModalOpen(!isModalOpen)}
			>
				{t(Translation.DELETE)}
			</Button>
			{isModalOpen && (
				<BlockerDialog
					onOk={onDelete}
					onCancel={() => setIsModalOpen(!isModalOpen)}
					message={'blockModal.confirmDelete'}
				/>
			)}
		</>
	);
};
