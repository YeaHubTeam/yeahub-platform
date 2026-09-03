import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

export interface DeleteButtonProps {
	onDelete: () => void;
	isDetailPage?: boolean;
	disabled?: boolean;
	tooltipTitle?: string;
	buttonText?: string;
	modalMessage?: string;
	showTooltip?: boolean;
}

export const DeleteButton = ({
	onDelete,
	isDetailPage = false,
	disabled = false,
	tooltipTitle = Translation.TOOLTIP_COLLECTION_DISABLED_INFO,
	buttonText = Translation.DELETE,
	modalMessage = Translation.MODAL_DELETE_TITLE,
	showTooltip = true,
}: DeleteButtonProps) => {
	const { t } = useTranslation(i18Namespace.translation);
	const { isOpen, onOpen, onClose } = useModal();

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
					aria-label={t(buttonText)}
					style={{
						width: isDetailPage ? 'auto' : '100%',
						padding: isDetailPage ? '0 32px' : '6px 10px',
						justifyContent: isDetailPage ? 'center' : 'flex-start',
					}}
					variant={isDetailPage ? 'destructive' : 'tertiary-link'}
					onClick={onOpen}
					preffix={isDetailPage ? undefined : <Icon icon="trash" size={24} />}
				>
					{t(buttonText)}
				</Button>
			</Tooltip>

			{isOpen && (
				<BlockerDialog
					isOpen={isOpen}
					onClose={onClose}
					onOk={onDelete}
					onCancel={onClose}
					message={t(modalMessage)}
				/>
			)}
		</>
	);
};
