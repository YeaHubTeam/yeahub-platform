import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { LanguageSwitcher } from '@/features/internationalization/switch-language';
import { ThemeSwitcher } from '@/features/theme/switch-theme';

import { UserPreferences } from '../UserPreferences/UserPreferences';

import styles from './HeaderLayout.module.css';

interface HeaderProps {
	onOpenSidebarDrawer: () => void;
}

export const Header = ({ onOpenSidebarDrawer }: HeaderProps) => {
	const showThemeButton = false;
	const showLanguageButton = false;

	return (
		<header className={styles.header}>
			<NavLink to={ROUTES.appRoute} className={styles.logo}>
				<AppLogo isOpen />
			</NavLink>

			{showThemeButton && <ThemeSwitcher />}
			{showLanguageButton && <LanguageSwitcher />}
			<UserPreferences />
			<IconButton
				aria-label="go to preferences"
				form="square"
				icon={<Icon icon="burger" size={32} />}
				size="small"
				variant="tertiary"
				onClick={onOpenSidebarDrawer}
				className={styles.burger}
			/>
		</header>
	);
};
