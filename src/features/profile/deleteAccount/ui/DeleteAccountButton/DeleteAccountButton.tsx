import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { useModal } from '@/shared/hooks';
import { Button } from '@/shared/ui/Button';

import { User as UserType } from '@/entities/user';

import { AdminDeleteAccountModal } from '../modals/AdminDeleteAccountModal/AdminDeleteAccountModal';
import { UserDeleteAccountModal } from '../modals/UserDeleteAccountModal/UserDeleteAccountModal';

import styles from './DeleteAccountButton.module.css';

interface DeleteAccountButtonProps {
	isAdmin?: boolean;
	user?: UserType;
}

export const DeleteAccountButton = ({ isAdmin = false, user }: DeleteAccountButtonProps) => {
	const { t } = useTranslation(i18Namespace.user);

	const {
		isOpen: isAdminDeleteModalOpen,
		onOpen: handleAdminDeleteModalOpen,
		onClose: handleAdminDeleteModalClose,
	} = useModal();

	const {
		isOpen: isUserDeleteModalOpen,
		onOpen: handleUserDeleteModalOpen,
		onClose: handleUserDeleteModalClose,
	} = useModal();

	const getDeleteButtonHandler = () => {
		return isAdmin ? handleAdminDeleteModalOpen : handleUserDeleteModalOpen;
	};

	return (
		<>
			<Button
				variant="destructive"
				size={isAdmin ? 'medium' : 'large'}
				className={styles.button}
				onClick={getDeleteButtonHandler()}
			>
				{isAdmin ? t(User.DELETE_ADMIN_BUTTON) : t(User.DELETE_BUTTON)}
			</Button>
			{isAdmin && user ? (
				<AdminDeleteAccountModal
					isOpen={isAdminDeleteModalOpen}
					onClose={handleAdminDeleteModalClose}
					user={user}
				/>
			) : (
				<UserDeleteAccountModal
					isOpen={isUserDeleteModalOpen}
					onClose={handleUserDeleteModalClose}
				/>
			)}
		</>
	);
};
