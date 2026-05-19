import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FeatureFlags, i18Namespace, Translation } from '@/shared/config';
import { BlockerDialog } from '@/shared/ui/BlockerDialogModal';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { Tooltip } from '@/shared/ui/Tooltip';

import { useDeleteFeatureFlagMutation } from '../api/deleteFeatureFlagApi';

interface DeleteFeatureFlagButtonProps {
	featureFlagId: string;
	isDetailPage?: boolean;
	disabled?: boolean;
	onSuccess?: () => void;
}

export const DeleteFeatureFlagButton = ({
	featureFlagId,
	isDetailPage = false,
	disabled = false,
	onSuccess,
}: DeleteFeatureFlagButtonProps) => {
	const [deleteFeatureFlag] = useDeleteFeatureFlagMutation();

	const { t } = useTranslation(i18Namespace.translation);
	const [isDeleteModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const onDeleteFeatureFlag = async () => {
		try {
			await deleteFeatureFlag(featureFlagId).unwrap();

			onSuccess?.();
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};

	return (
		<>
			<Tooltip
				title={t(FeatureFlags.TOOLTIP_FEATURE_FLAGS_DISABLED_INFO)}
				placement={isDetailPage ? 'bottom-start' : 'left'}
				color="red"
				offsetTooltip={10}
				shouldShowTooltip={disabled}
			>
				<Button
					aria-label="Large"
					style={{
						width: isDetailPage ? 'auto' : '100%',
						padding: isDetailPage ? '0 32px' : '6px 10px',
						justifyContent: isDetailPage ? 'center' : 'flex-start',
					}}
					preffix={!isDetailPage && <Icon icon="trash" size={24} />}
					variant={isDetailPage ? 'destructive' : 'tertiary-link'}
					onClick={handleOpenModal}
					disabled={disabled}
				>
					{t(Translation.DELETE)}
				</Button>
			</Tooltip>

			{isDeleteModalOpen && (
				<BlockerDialog
					isOpen={isDeleteModalOpen}
					onClose={handleCloseModal}
					onOk={onDeleteFeatureFlag}
					onCancel={() => setIsModalOpen(false)}
					message={FeatureFlags.MODAL_FEATURE_FLAG_DELETE_DESCRIPTION}
				/>
			)}
		</>
	);
};
