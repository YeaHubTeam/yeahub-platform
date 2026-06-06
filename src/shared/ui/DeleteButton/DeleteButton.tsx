import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

interface DeleteButtonProps<Id extends string | number = string | number> {
	id: Id;
	onDelete: (id: Id) => Promise<void>;
	onSuccess?: () => void;
	isDetailPage?: boolean;
	disabled?: boolean;
	tooltipTitle?: string;
	buttonText?: string;
	modalMessage?: string;
	showTooltip?: boolean;
}

export const DeleteButton = <Id extends string | number = string | number>({
	id,
	onDelete,
	onSuccess,
	isDetailPage = false,
	disabled = false,
	tooltipTitle = Translation.TOOLTIP_COLLECTION_DISABLED_INFO,
	buttonText = Translation.DELETE,
	modalMessage = Translation.MODAL_DELETE_TITLE,
	showTooltip = true,
}: DeleteButtonProps<Id>) => {
	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleDelete = async () => {
		try {
			await onDelete(id);
			// handleCloseModal(); т.к элемент удалится, то и модалка закроется сама
			onSuccess?.();
		} catch (error) {
			console.error(error);
		}
	};

	const shouldShowTooltip = disabled && showTooltip;

	return (
		<>
			<Tooltip
				title={t(tooltipTitle)}
				placement={isDetailPage ? 'bottom-start' : 'left'}
				color="red"
				offsetTooltip={10}
				shouldShowTooltip={shouldShowTooltip}
			>
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
					{t(buttonText)}
				</Button>
			</Tooltip>

			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={handleDelete}
					onCancel={handleCloseModal}
					message={t(modalMessage)}
				/>
			)}
		</>
	);
};
