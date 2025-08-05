import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User } from '@/shared/config/i18n/i18nTranslations';
import { Modal, RequiredModalProps } from '@/shared/ui/Modal';
import { TextHtml } from '@/shared/ui/TextHtml';

import { User as UserType } from '@/entities/user';

import { useDeleteAccountMutation } from '@/features/profile/deleteAccount/api/deleteAccountApi';

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
			title={t(User.DELETE_ADMIN_TITLE)}
			variant="error"
			isOpen={isOpen}
			onClose={onClose}
			buttonPrimaryText={t(User.DELETE_BUTTON)}
			buttonOutlineText={t(Translation.CANCEL, { ns: 'translation' })}
			buttonPrimaryClick={handleDeleteAccount}
			buttonOutlineClick={onClose}
		>
			<TextHtml html={t(User.DELETE_ADMIN_DESCRIPTION_MODAL, { username: user.username })} />
		</Modal>
	);
};
