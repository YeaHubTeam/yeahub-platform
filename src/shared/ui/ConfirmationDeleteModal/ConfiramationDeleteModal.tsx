import { ChangeEvent, useState } from 'react';

import { Input } from '@/shared/ui/Input';
import { Modal, ModalProps } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import styles from './ConfirmationDeleteModal.module.css';

export type UserDeleteAccountModalProps = Pick<ModalProps, 'isOpen' | 'onClose'> & {
	confirmationName: string;
	onDelete: () => void;
	modalTitle: string;
	confirmButtonText: string;
	discardButtonText: string;
	deleteDescriptionModal: string;
	deleteLabel: string;
	deletePlaceholder: string;
};

export const ConfirmationDeleteModal = ({
	isOpen,
	onClose,
	confirmationName,
	onDelete,
	modalTitle,
	confirmButtonText,
	discardButtonText,
	deleteDescriptionModal,
	deleteLabel,
	deletePlaceholder,
}: UserDeleteAccountModalProps) => {
	const [value, setValue] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

	const handleClose = () => {
		setValue('');
		onClose();
	};

	const handleDeleteAccount = () => {
		onDelete();
		onClose();
	};

	const isButtonDisabled = value !== confirmationName;

	return (
		<Modal
			title={modalTitle}
			variant="error"
			buttonPrimaryText={confirmButtonText}
			buttonOutlineText={discardButtonText}
			buttonPrimaryDisabled={isButtonDisabled}
			buttonOutlineClick={handleClose}
			buttonPrimaryClick={handleDeleteAccount}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<TextHtml html={deleteDescriptionModal} className={styles.description} />
			<Text variant="body2" className={styles.label}>
				{deleteLabel}
			</Text>
			<Input
				value={value}
				onChange={handleChange}
				placeholder={deletePlaceholder}
				className={styles.input}
			/>
		</Modal>
	);
};
