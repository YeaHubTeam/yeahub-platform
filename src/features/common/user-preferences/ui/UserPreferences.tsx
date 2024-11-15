import cn from 'classnames';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Icon, IconButton, Popover, Text } from 'yeahub-ui-kit';

import Settings from '@/shared/assets/icons/Settings.svg';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';
import { Button } from '@/shared/ui/Button';
import { ProfileIcon } from '@/shared/ui/Icons/ProfileIcon';
import { SignOutIcon } from '@/shared/ui/Icons/SignOutIcon';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();

	const [isOpenSettingsPopover, setIsOpenSettingsPopover] = useState<boolean>(false);

	const [trigger] = useLazyLogoutQuery();

	const location = useLocation();

	const handleLogoutUser = () => {
		trigger();
	};

	const handleOpenSettingsPopover = () => setIsOpenSettingsPopover((prev) => !prev);
	const { t } = useI18nHelpers();
	const SettingsPopover = () => {
		return (
			<div key="settingpopemvcdf" className={styles.settings}>
				<NavLink
					to={ROUTES.profile.page}
					className={({ isActive }) =>
						cn({ [styles['btn-active']]: isActive && location.pathname === ROUTES.profile.page })
					}
				>
					<Button className={styles.button} variant="tertiary" preffix={<ProfileIcon />}>
						{t(Translation.USERPREFERENCES_MYPROFILE)}
					</Button>
				</NavLink>

				<NavLink
					to={ROUTES.settings.page}
					className={({ isActive }) =>
						cn({
							[styles['btn-active']]: isActive && location.pathname === ROUTES.settings.page,
						})
					}
				>
					<Button
						className={styles.button}
						variant="tertiary"
						preffix={<Settings key="userPreferenceSettings" width={24} height={24} />}
					>
						{t(Translation.SETTINGS)}
					</Button>
				</NavLink>
				<Button
					className={styles.button}
					variant="tertiary"
					preffix={<SignOutIcon />}
					onClick={handleLogoutUser}
				>
					{t(Translation.USERPREFERENCES_LOGOUT)}
				</Button>
			</div>
		);
	};

	return (
		<div className={styles.preferences}>
			<Popover
				isOpen={isOpenSettingsPopover}
				body={<SettingsPopover />}
				onClickOutside={handleOpenSettingsPopover}
			>
				<IconButton
					aria-label="go to preferences"
					form="square"
					icon={<Icon key="userPreferenceGearSixIcon" icon="gearSix" size={20} />}
					size="small"
					theme="tertiary"
					onClick={handleOpenSettingsPopover}
					isActive={isOpenSettingsPopover}
				/>
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
