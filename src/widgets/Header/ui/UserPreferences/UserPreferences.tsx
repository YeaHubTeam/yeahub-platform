import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Text } from 'yeahub-ui-kit';

import i18n from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { useProfileQuery } from '@/entities/auth';

import { Logout } from '@/features/authentication/logout/Logout';

import { UserPreferencesHeader } from '../UserPreferencesHeader/UserPreferencesHeader';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();
	const navigate = useNavigate();

	const { t } = useTranslation();
	const userMenuItems: PopoverMenuItem[] = [
		{
			renderComponent: () => <UserPreferencesHeader />,
		},
		{
			title: i18n.t(Translation.PROFILE),
			onClick: () => {
				navigate(ROUTES.profile.route);
			},
		},
		{
			title: i18n.t(Translation.HEADER_MENU_CHANGE_PASSWORD),
			onClick: () => {
				navigate(`${ROUTES.settings.route}#change-password`);
			},
		},
		{
			renderComponent: () => <Logout />,
		},
	];

	return (
		<div className={styles['popover-additional']}>
			<Popover menuItems={userMenuItems}>
				{({ onToggle }) => (
					<button className={styles.preferences} onClick={onToggle}>
						{isSuccessGetProfile && (
							<>
								<Text text={profile?.firstName} />
								<div className={styles.avatar}>
									{profile.avatarUrl ? (
										<img
											className={styles.img}
											src={profile.avatarUrl}
											alt={t(Translation.AVATAR)}
										/>
									) : (
										<AvatarWithoutPhoto />
									)}
								</div>
							</>
						)}
					</button>
				)}
			</Popover>
		</div>
	);
};
