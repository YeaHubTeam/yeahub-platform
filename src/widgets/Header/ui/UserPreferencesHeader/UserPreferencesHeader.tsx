import { useTranslation } from 'react-i18next';

import ProSubIcon from '@/shared/assets/icons/proSub.svg';
import { i18Namespace, User, Translation } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Button } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import styles from './UserPreferencesHeader.module.css';

interface UserPreferencesHeaderProps {
	isPremiumUser: boolean;
}

export const UserPreferencesHeader = ({ isPremiumUser }: UserPreferencesHeaderProps) => {
	const profile = useAppSelector(getFullProfile);

	const { t } = useTranslation(i18Namespace.user);

	return (
		<div className={styles.container}>
			{profile && (
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
								{profile.username}
							</Text>
							<Text variant={'body2'} color="black-700">
								{profile.email}
							</Text>
						</div>
						<Button
							className={styles[isPremiumUser ? 'candidate-premium' : 'candidate-free']}
							fullWidth
							preffix={isPremiumUser && <ProSubIcon className={styles['premium-icon']} />}
						>
							{t(isPremiumUser ? User.SUBSCRIPTION_PREMIUM : User.SUBSCRIPTION_FREE)}
						</Button>
					</Flex>
				</>
			)}
		</div>
	);
};
