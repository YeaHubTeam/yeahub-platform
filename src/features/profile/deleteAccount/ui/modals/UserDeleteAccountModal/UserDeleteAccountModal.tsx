import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Translation, User } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { ConfirmationDeleteModal } from '@/shared/ui/ConfirmationDeleteModal';

import { getFullProfile } from '@/entities/profile';

import { useDeleteAccountMutation } from './../../../api/deleteAccountApi';
import { UserDeleteAccountModalProps } from './../../../model/types/deleteAccount';

export const UserDeleteAccountModal = ({ isOpen, onClose }: UserDeleteAccountModalProps) => {
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
