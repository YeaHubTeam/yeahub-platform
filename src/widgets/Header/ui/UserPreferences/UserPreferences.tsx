import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';
import { Text } from '@/shared/ui/Text';

import { getFullProfile } from '@/entities/profile';

import { Logout } from '@/features/authentication/logout/Logout';

import { UserPreferencesHeader } from '../UserPreferencesHeader/UserPreferencesHeader';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const profile = useAppSelector(getFullProfile);
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
			title: i18n.t(Translation.HEADER_MENU_CHANGE_PASSWORD),
			onClick: () => {
				navigate(`${ROUTES.settings.page}#change-password`);
			},
		},
		{
			renderComponent: () => <Logout />,
		},
	];

	return (
		<div className={styles['popover-additional']}>
			<Popover menuItems={userMenuItems} header={<UserPreferencesHeader />}>
				{({ onToggle }) => (
					<button className={styles.preferences} onClick={onToggle}>
						<Text variant={'body2'}>{profile?.firstName}</Text>
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
