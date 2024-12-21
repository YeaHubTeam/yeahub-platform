import { useTranslation } from 'react-i18next';
import { Text } from 'yeahub-ui-kit';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import { useProfileQuery } from '@/entities/auth';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();

	const { t } = useTranslation();

	return (
		<div className={styles.preferences}>
			{isSuccessGetProfile && (
				<>
					<Text text={profile?.firstName} />
					<div className={styles.avatar}>
						{profile.avatarUrl ? (
							<img className={styles.img} src={profile.avatarUrl} alt={t(Translation.AVATAR)} />
						) : (
							<AvatarWithoutPhoto />
						)}
					</div>
				</>
			)}
		</div>
	);
};
