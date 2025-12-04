import { useTranslation } from 'react-i18next';

import { i18Namespace, User } from '@/shared/config';
import { useModal } from '@/shared/libs';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import { User as UserType } from '@/entities/user';

import { AdminDeleteAccountModal } from '../AdminDeleteAccountModal/AdminDeleteAccountModal';
import { UserDeleteAccountModal } from '../UserDeleteAccountModal/UserDeleteAccountModal';

import styles from './DeleteAccountButton.module.css';

interface DeleteAccountButtonProps {
	isAdmin?: boolean;
	user?: UserType;
	isDetailPage?: boolean;
}

export const DeleteAccountButton = ({
	isAdmin = false,
	user,
	isDetailPage = false,
}: DeleteAccountButtonProps) => {
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
				variant={isDetailPage ? 'tertiary-link' : 'destructive'}
				size={isAdmin ? 'medium' : 'large'}
				className={styles.button}
				onClick={getDeleteButtonHandler()}
				preffix={isDetailPage ? <Icon icon="trash" size={24} /> : undefined}
				style={{
					width: isDetailPage ? '100%' : 'auto',
					padding: isDetailPage ? '6px 10px' : '0 32px',
					justifyContent: isDetailPage ? 'flex-start' : 'center',
				}}
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
