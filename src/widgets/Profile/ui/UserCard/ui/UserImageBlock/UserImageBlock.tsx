import { i18Namespace } from '@/shared/config/i18n';
import { Profile } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import { GetProfileResponse } from '@/entities/auth';

import styles from './UserImageBlock.module.css';

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
				<div className={styles['card-placeholder']}>
					<AvatarWithoutPhoto />
				</div>
			)}
		</div>
	);
};
