import { useTranslation } from 'react-i18next';

import { i18Namespace, Translation, User } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { ConfirmationDeleteModal } from '@/shared/ui/ConfirmationDeleteModal';
import { RequiredModalProps } from '@/shared/ui/Modal';

import { getFullProfile } from '@/entities/profile';

import { useDeleteAccountMutation } from '../../api/deleteAccountApi';

export const UserDeleteAccountModal = ({ isOpen, onClose }: RequiredModalProps) => {
	const { t } = useTranslation([i18Namespace.user, i18Namespace.translation]);

	const profile = useAppSelector(getFullProfile);
	const [deleteAccount] = useDeleteAccountMutation();

	const handleDeleteAccount = () => deleteAccount({ userId: profile?.id });

	return (
		<ConfirmationDeleteModal
			confirmationName={profile.username}
			onDelete={handleDeleteAccount}
			modalTitle={t(User.DELETE_TITLE)}
			confirmButtonText={t(User.DELETE_BUTTON)}
			discardButtonText={t(Translation.CANCEL, { ns: 'translation' })}
			deleteDescriptionModal={t(User.DELETE_DESCRIPTION_MODAL)}
			deleteLabel={t(User.DELETE_LABEL)}
			deletePlaceholder={t(User.DELETE_PLACEHOLDER)}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};
