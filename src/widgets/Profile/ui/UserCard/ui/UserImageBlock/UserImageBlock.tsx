import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { GetProfileResponse } from '@/entities/auth';

import styles from './UserImageBlock.module.css';
import { Profile } from '@/shared/config/i18n/i18nTranslations';

interface UserImageBlockProps {
	profile: GetProfileResponse;
}

export const UserImageBlock = ({ profile }: UserImageBlockProps) => {
	const { t } = useI18nHelpers(i18Namespace.profile);
	return (
		<div className={styles['card-image']}>
			{profile.avatarUrl ? (
				<div className={styles['card-avatar']}>
					<img src={profile.avatarUrl} alt={t(Profile.PHOTO_TITLE)} />
				</div>
			) : (
				<AvatarWithoutPhoto />
			)}
		</div>
	);
};
