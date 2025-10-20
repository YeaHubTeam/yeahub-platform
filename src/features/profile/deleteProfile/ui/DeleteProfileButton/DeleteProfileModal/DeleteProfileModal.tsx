import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { ConfirmationDeleteModal } from '@/shared/ui/ConfirmationDeleteModal';

import { getFullProfile } from '@/entities/profile';

import { useDeleteProfileMutation } from '../../../api/deleteProfileApi';
import { DeleteProfileModalProps } from '../../../model/types/deleteProfileTypes';

export const DeleteProfileModal = ({ isOpen, onClose, profileId }: DeleteProfileModalProps) => {
	const { t } = useTranslation([i18Namespace.profile, i18Namespace.translation]);

	const profile = useAppSelector(getFullProfile);

	const [deleteProfile] = useDeleteProfileMutation();

	const handleDeleteProfile = () => {
		deleteProfile(profileId);
	};

	return (
		<ConfirmationDeleteModal
			confirmationName={profile.username}
			onDelete={handleDeleteProfile}
			modalTitle={t(Profile.MANAGE_PROFILES_MODAL_DELETE_PROFILE_TITLE)}
			confirmButtonText={t(Profile.MANAGE_PROFILES_MODAL_DELETE_PROFILE_BUTTON)}
			discardButtonText={t(Translation.CANCEL, { ns: 'translation' })}
			deleteDescriptionModal={t(Profile.MANAGE_PROFILES_MODAL_DELETE_PROFILE_DESCRIPTION)}
			deleteLabel={t(Profile.MANAGE_PROFILES_MODAL_DELETE_PROFILE_LABEL)}
			deletePlaceholder={t(Profile.MANAGE_PROFILES_MODAL_DELETE_PROFILE_PLACEHOLDER)}
			isOpen={isOpen}
			onClose={onClose}
		/>
	);
};
