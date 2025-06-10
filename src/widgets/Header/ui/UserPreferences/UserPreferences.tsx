import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import FreeSubIcon from '@/shared/assets/icons/free-sub.svg';
import ProSubIcon from '@/shared/assets/icons/pro-sub.svg';
import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getHasPremiumAccess } from '@/entities/profile';

import { Logout } from '@/features/authentication/logout/Logout';

import { UserPreferencesHeader } from '../UserPreferencesHeader/UserPreferencesHeader';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const profile = useAppSelector(getFullProfile);
	const isPremiumUser = useAppSelector(getHasPremiumAccess);
	const navigate = useNavigate();

	const { t } = useTranslation();
	const userMenuItems: PopoverMenuItem[] = [
		{
			title: i18n.t(Translation.PROFILE),
			onClick: () => {
				navigate(`${ROUTES.profile.page}`);
			},
		},
		{
			title: i18n.t(Translation.HEADER_MENU_CHOOSE_MEMBERSHIP),
			onClick: () => {
				navigate(`${ROUTES.settings.page}#select-tariff`);
			},
		},
		{
			title: i18n.t(Translation.HEADER_MENU_SETTINGS),
			onClick: () => {
				navigate(`${ROUTES.settings.page}`);
			},
		},
		{
			renderComponent: () => <Logout />,
		},
	];

	return (
		<div className={styles['popover-additional']}>
			<Popover
				menuItems={userMenuItems}
				header={<UserPreferencesHeader isPremiumUser={isPremiumUser} />}
			>
				{({ onToggle }) => (
					<button className={styles.preferences} onClick={onToggle}>
						{isPremiumUser ? (
							<ProSubIcon className={styles['premium-icon']} />
						) : (
							<FreeSubIcon className={styles['free-icon']} />
						)}
						<Text variant={'body2'}>{profile?.username}</Text>
						<div className={styles.avatar}>
							{profile.avatarUrl ? (
								<img className={styles.img} src={profile.avatarUrl} alt={t(Translation.AVATAR)} />
							) : (
								<AvatarWithoutPhoto />
							)}
						</div>
					</button>
				)}
			</Popover>
		</div>
	);
};
