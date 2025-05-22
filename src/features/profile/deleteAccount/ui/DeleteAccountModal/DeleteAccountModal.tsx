import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User } from '@/shared/config/i18n/i18nTranslations';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { FullProfile } from '@/entities/auth';
import { User as UserType } from '@/entities/user';

import { useDeleteAccountMutation } from '../../api/deleteAccountApi';

import styles from './DeleteAccountModal.module.css';

interface DeleteAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	profile: FullProfile | UserType;
	isAdmin?: boolean;
	warningMessage?: string;
	confirmationLabel?: string;
	confirmationPlaceholder?: string;
}

export const DeleteAccountModal = ({
	isOpen,
	onClose,
	profile,
	warningMessage = '',
	confirmationLabel,
	confirmationPlaceholder,
	isAdmin = false,
}: DeleteAccountModalProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const [deleteAccount] = useDeleteAccountMutation();

	const [value, setValue] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

	const handleClose = () => {
		setValue('');
		onClose();
	};

	const handleDeleteAccount = () => deleteAccount({ userId: profile?.id, isAdmin });

	const isButtonDisabled = value !== profile?.username;

	return (
		<Modal
			title={t(User.DELETE_TITLE)}
			variant="error"
			buttonPrimaryText={t(User.DELETE_BUTTON)}
			buttonOutlineText={t(Translation.CANCEL, { ns: 'translation' })}
			buttonPrimaryDisabled={isButtonDisabled}
			buttonOutlineClick={handleClose}
			buttonPrimaryClick={handleDeleteAccount}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<TextHtml html={warningMessage} className={styles.description} />
			<Text variant="body2" className={styles.label}>
				{confirmationLabel}
			</Text>
			<Input
				value={value}
				onChange={handleChange}
				placeholder={confirmationPlaceholder}
				className={styles.input}
			/>
		</Modal>
	);
};
