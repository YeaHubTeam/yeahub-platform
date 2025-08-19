import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { FormField } from '@/shared/ui/FormField/FormField';
import { ImageLoader } from '@/shared/ui/ImageLoader';

import { getFullProfile } from '@/entities/profile';

import { useUpdateAvatarMutation } from '../../api/editProfileApi';
import { ProfileSchema } from '../../model/types/editProfileTypes';

export const AvatarField = () => {
	const { t } = useTranslation(i18Namespace.profile);
	const { setValue } = useFormContext<ProfileSchema>();
	const profile = useAppSelector(getFullProfile);

	const [updateAvatar, { isLoading: isAvatarLoading }] = useUpdateAvatarMutation();

	const onImageChange = (image: string | null) => {
		setValue('image', image);
		updateAvatar({ id: profile.id, image, oldImage: profile.avatarUrl });
	};

	return (
		<FormField
			isLimitWidth
			label={t(Profile.PHOTO_TITLE)}
			description={t(Profile.PHOTO_DESCRIPTION)}
		>
			<ImageLoader
				cropper={{
					aspectRatio: 1,
					title: t(Profile.PHOTO_MODAL_TITLE),
					description: t(Profile.PHOTO_MODAL_DESCRIPTION),
				}}
				minResolution={{ width: 128, height: 128 }}
				maxResolution={{ width: 2048, height: 2048 }}
				maxMBSize={5}
				setValue={onImageChange}
				initialSrc={profile.avatarUrl}
				isLoading={isAvatarLoading}
			/>
		</FormField>
	);
};
