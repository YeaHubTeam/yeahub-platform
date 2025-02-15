import { useTranslation } from 'react-i18next';

import ProSubIcon from '@/shared/assets/icons/pro-sub.svg';
import { i18Namespace } from '@/shared/config/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { User } from '@/shared/config/i18n/i18nTranslations';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { useProfileQuery } from '@/entities/auth';

import styles from './UserPreferencesHeader.module.css';

interface UserPreferencesHeaderProps {
	isPremiumUser: boolean;
}

export const UserPreferencesHeader = ({ isPremiumUser }: UserPreferencesHeaderProps) => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();
	const { t } = useTranslation(i18Namespace.user);

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
						<Flex align="center" gap="8" justify="center" className={styles.status}>
							<Text
								variant="body3"
								className={styles[!isPremiumUser ? 'candidate-premium' : 'candidate-free']}
							>
								{!isPremiumUser && <ProSubIcon className={styles['premium-icon']} />}
								{t(!isPremiumUser ? User.SUBSCRIPTION_PREMIUM : User.SUBSCRIPTION_FREE)}
							</Text>
						</Flex>
					</Flex>
				</>
			)}
		</div>
	);
};
