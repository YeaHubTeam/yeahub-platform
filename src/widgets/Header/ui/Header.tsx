import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import Settings from '@/shared/assets/icons/Settings.svg';
import { Translation } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { AppLogo } from '@/shared/ui/AppLogo';

// import { ThemeSwitcher } from '@/features/theme/switch-theme';
import { IconButton } from '@/shared/ui/IconButton';
import { MenuIcon } from '@/shared/ui/Icons/MenuIcon';
import { ProfileIcon } from '@/shared/ui/Icons/ProfileIcon';
import { SignOutIcon } from '@/shared/ui/Icons/SignOutIcon';
import { Popover, PopoverMenuItem } from '@/shared/ui/Popover';

import { useLazyLogoutQuery } from '@/entities/auth';

import { UserPreferences } from '@/features/common/user-preferences';

import styles from './Header.module.css';

interface HeaderProps {
	onOpenSidebarDrawer: () => void;
}

export const Header = ({ onOpenSidebarDrawer }: HeaderProps) => {
	const navigate = useNavigate();
	const { isMobile } = useScreenSize();
	const [logout] = useLazyLogoutQuery();
	const { t } = useI18nHelpers();

	const settingsMenuItems: PopoverMenuItem[] = [
		{
			icon: <MenuIcon isCurrentColor />,
			title: t(Translation.USERPREFERENCES_MENU),
			onClick: () => {
				onOpenSidebarDrawer();
			},
		},
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
		<header className={styles.header}>
			{isMobile && (
				<NavLink to={ROUTES.appRoute} className={styles.logo}>
					<AppLogo isOpen />
				</NavLink>
			)}

			{/* <ThemeSwitcher /> */}
			<UserPreferences />
			{isMobile && (
				<Popover menuItems={settingsMenuItems}>
					{({ onToggle }) => (
						<IconButton
							aria-label="go to preferences"
							form="square"
							icon={<Icon icon="list" size={32} />}
							size="S"
							variant="tertiary"
							onClick={onToggle}
							className={styles.burger}
						/>
					)}
				</Popover>
			)}
		</header>
	);
};
