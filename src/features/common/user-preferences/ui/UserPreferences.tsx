import cn from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Icon, IconButton, Popover, Text } from 'yeahub-ui-kit';

import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { AvatarWithoutPhoto } from '@/shared/ui/AvatarWithoutPhoto';

import { useLazyLogoutQuery, useProfileQuery } from '@/entities/auth';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	const { data: profile, isSuccess: isSuccessGetProfile } = useProfileQuery();

	const [isOpenSettingsPopover, setIsOpenSettingsPopover] = useState<boolean>(false);

	const [trigger] = useLazyLogoutQuery();

	const handleLogoutUser = () => {
		trigger();
	};

	const handleOpenSettingsPopover = () => setIsOpenSettingsPopover((prev) => !prev);

	const SettingsPopover = () => {
		const { t } = useI18nHelpers();

		return (
			<div key="settingpopemvcdf" className={styles.settings}>
				<NavLink
					to={ROUTES.profile.page}
					className={({ isActive }) => cn({ [styles['btn-active']]: isActive })}
				>
					<Button
						className={styles.button}
						theme="tertiary"
						preffix={<Icon key="userPreferenceUserIcon" icon="user" size={24} />}
					>
						{t(Translation.USERPREFERENCES_MYPROFILE)}
					</Button>
				</NavLink>
				<Button
					className={styles.button}
					theme="tertiary"
					preffix={<Icon key="userPreferenceSignOutIcon" icon="signOut" size={24} />}
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
							<img className={styles.img} src={profile.avatarUrl} alt="avatar" />
						) : (
							<AvatarWithoutPhoto />
						)}
					</div>
				</>
			)}
		</div>
	);
};
