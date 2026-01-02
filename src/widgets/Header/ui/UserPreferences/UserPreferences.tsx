import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import FreeSubIcon from '@/shared/assets/icons/freeSub.svg';
import ProSubIcon from '@/shared/assets/icons/proSub.svg';
import { Translation, ROUTES, i18n } from '@/shared/config';
import { useAppSelector, SELECT_TARIFF_SETTINGS_TAB } from '@/shared/libs';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { getFullProfile, getHasPremiumAccess } from '@/entities/profile';

import { LogoutButton } from '@/widgets/Header/ui/LogoutButton/LogoutButton';

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
				navigate(SELECT_TARIFF_SETTINGS_TAB);
			},
		},
		{
			title: i18n.t(Translation.HEADER_MENU_SETTINGS),
			onClick: () => {
				navigate(`${ROUTES.settings.page}`);
			},
		},
		{
			renderComponent: () => <LogoutButton />,
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
						<Text variant="body2">{profile?.username}</Text>
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
