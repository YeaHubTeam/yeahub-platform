import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace, Resources, Translation } from '@/shared/config';
import { useScreenSize } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Modal } from '@/shared/ui/Modal';

import { useDeleteMyResourceRequestMutation } from '../../api/deleteMyResorceRequestApi';

import styles from './DeleteMyResourceRequestButton.module.css';

interface DeleteMyResourceRequestButtonProps {
	requestId: string;
}

export const DeleteMyResourceRequestButton = ({
	requestId,
}: DeleteMyResourceRequestButtonProps) => {
	const { t } = useTranslation([i18Namespace.resources, i18Namespace.translation]);
	const { isMobileS } = useScreenSize();
	const [isOpen, setIsOpen] = useState(false);
	const [deleteApplication, { isLoading }] = useDeleteMyResourceRequestMutation();

	const handleConfirm = async () => {
		try {
			await deleteApplication(requestId);
		} finally {
			setIsOpen(false);
		}
	};
	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Button
				variant="outline"
				size="large"
				fullWidth={isMobileS}
				className={styles.button}
				onClick={() => setIsOpen(true)}
				disabled={isLoading}
			>
				{t(Resources.WITHDRAW_BUTTON)}
			</Button>
			<Modal
				isOpen={isOpen}
				variant="error"
				title={t(Resources.WITHDRAW_TITLE)}
				buttonPrimaryText={t(Translation.MODAL_ACTIONS_OK, { ns: i18Namespace.translation })}
				buttonOutlineText={t(Translation.MODAL_ACTIONS_CANCEL, { ns: i18Namespace.translation })}
				buttonPrimaryDisabled={isLoading}
				buttonPrimaryClick={handleConfirm}
				buttonOutlineClick={handleClose}
				onClose={handleClose}
			/>
		</>
	);
};
