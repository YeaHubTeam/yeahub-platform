import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { TextHtml } from '@/shared/ui/TextHtml';

import { getFullProfile } from '@/entities/profile';

import { useDeleteAccountMutation } from './../../../api/deleteAccountApi';
import { UserDeleteAccountModalProps } from './../../../model/types/deleteAccount';
import styles from './UserDeleteAccountModal.module.css';

export const UserDeleteAccountModal = ({ isOpen, onClose }: UserDeleteAccountModalProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const profile = useAppSelector(getFullProfile);
	const [deleteAccount] = useDeleteAccountMutation();

	const [value, setValue] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

	const handleClose = () => {
		setValue('');
		onClose();
	};

	const handleDeleteAccount = () => deleteAccount({ userId: profile?.id });

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
			<TextHtml html={t(User.DELETE_DESCRIPTION_MODAL)} className={styles.description} />
			<Text variant="body2" className={styles.label}>
				{t(User.DELETE_LABEL)}
			</Text>
			<Input
				value={value}
				onChange={handleChange}
				placeholder={t(User.DELETE_PLACEHOLDER)}
				className={styles.input}
			/>
		</Modal>
	);
};
