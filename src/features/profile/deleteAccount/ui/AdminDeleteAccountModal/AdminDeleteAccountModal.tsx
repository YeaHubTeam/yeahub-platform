import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation, User } from '@/shared/config';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

import { User as UserType } from '@/entities/user';

import { useDeleteAccountMutation } from '../../api/deleteAccountApi';

import styles from './AdminDeleteAccountModal.module.css';

interface AdminDeleteAccountModalProps extends RequiredModalProps {
	user: UserType;
}

export const AdminDeleteAccountModal = ({
	isOpen,
	onClose,
	user,
}: AdminDeleteAccountModalProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const [deleteAccount] = useDeleteAccountMutation();

	const handleDeleteAccount = () => {
		deleteAccount({ userId: user.id, isAdmin: true });
	};

	return (
		<Modal
			className={styles.modal}
			title={t(User.DELETE_ADMIN_TITLE)}
			variant="error"
			isOpen={isOpen}
			onClose={onClose}
			buttonPrimaryText={t(User.DELETE_BUTTON)}
			buttonOutlineText={t(Translation.CANCEL, { ns: 'translation' })}
			buttonPrimaryClick={handleDeleteAccount}
			buttonOutlineClick={onClose}
		>
			<Text variant="body3-accent">
				{t(User.DELETE_ADMIN_DESCRIPTION_MODAL, { username: user.username })}
			</Text>
		</Modal>
	);
};
