import React from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation } from '@/shared/config';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

interface FeatureFlagEditFormCancelModalProps {
	isOpen: boolean;
	onClose: () => void;
	onResetFormValues: () => void;
}

export const FeatureFlagEditFormCancelModal = ({
	isOpen,
	onClose,
	onResetFormValues,
}: FeatureFlagEditFormCancelModalProps) => {
	const { t } = useTranslation(i18Namespace.translation);

	return (
		<Modal
			title={t(Translation.MODAL_BLOCK_TITLE)}
			isOpen={isOpen}
			onClose={onClose}
			buttonOutlineText={t(Translation.MODAL_ACTIONS_CANCEL)}
			buttonOutlineClick={onClose}
			buttonPrimaryText={t(Translation.MODAL_ACTIONS_OK)}
			buttonPrimaryClick={onResetFormValues}
			variant="default"
		>
			<Text variant="body3">{t(Translation.MODAL_CANCEL_CHANGES)}</Text>
		</Modal>
	);
};
