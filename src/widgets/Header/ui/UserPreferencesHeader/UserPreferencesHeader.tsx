import { useTranslation } from 'react-i18next';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useProfileQuery } from '@/entities/auth';

import styles from './UserPreferencesHeader.module.css';

export const UserPreferencesHeader = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			{isSuccessGetProfile && (
				<>
					<Flex direction="column" align="center" gap="14" className={styles.header}>
						<div className={styles.avatar}>
							{profile.avatarUrl ? (
								<img
									src={profile.avatarUrl}
									alt={t(Translation.AVATAR)}
									className={styles['avatar-image']}
								/>
							) : (
								<AvatarWithoutPhoto />
							)}
						</div>
						<div className={styles['header-text']}>
							<Text variant={'body3-accent'} className={styles['full-name']}>
								{profile.firstName} {profile.lastName}
							</Text>
							<Text variant={'body2'} color="black-700">
								{profile.email}
							</Text>
						</div>
					</Flex>
				</>
			)}
		</div>
	);
};
