import { useNavigate } from 'react-router-dom';
import { Icon, Text } from 'yeahub-ui-kit';

import Settings from '@/shared/assets/icons/Settings.svg';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { IconButton } from '@/shared/ui/IconButton';
import { ProfileIcon } from '@/shared/ui/Icons/ProfileIcon';
import { SignOutIcon } from '@/shared/ui/Icons/SignOutIcon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();

	const [logout] = useLazyLogoutQuery();

	const navigate = useNavigate();

	const { t } = useI18nHelpers();

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <ProfileIcon isCurrentColor />,
			title: t(Translation.USERPREFERENCES_MYPROFILE),
			onClick: () => {
				navigate(ROUTES.profile.page);
			},
		},
		{
			icon: <Settings key="userPreferenceSettings" width={24} height={24} />,
			title: t(Translation.SETTINGS),
			onClick: () => {
				navigate(ROUTES.settings.page);
			},
		},
		{
			icon: <SignOutIcon isCurrentColor />,
			title: t(Translation.USERPREFERENCES_LOGOUT),
			onClick: () => {
				logout();
			},
		},
	];

	return (
		<div className={styles.preferences}>
			<Popover menuItems={settingsMenuItems}>
				{({ onToggle }) => (
					<IconButton
						aria-label="go to preferences"
						form="square"
						icon={<Icon key="userPreferenceGearSixIcon" icon="gearSix" size={20} />}
						size="S"
						variant="tertiary"
						onClick={onToggle}
					/>
				)}
			</Popover>
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
