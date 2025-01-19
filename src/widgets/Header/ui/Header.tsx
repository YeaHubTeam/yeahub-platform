import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'yeahub-ui-kit';

import { ROUTES } from '@/shared/config/router/routes';
import { AppLogo } from '@/shared/ui/AppLogo';
// import { ThemeSwitcher } from '@/features/theme/switch-theme';
import { IconButton } from '@/shared/ui/IconButton';

import { UserPreferences } from '@/features/common/user-preferences';

import styles from './Header.module.css';

interface HeaderProps {
	onOpenSidebarDrawer: () => void;
}

export const Header = ({ onOpenSidebarDrawer }: HeaderProps) => {
	return (
		<header className={styles.header}>
			<NavLink to={ROUTES.appRoute} className={styles.logo}>
				<AppLogo isOpen />
			</NavLink>

			{/* <ThemeSwitcher /> */}
			<UserPreferences />
			<IconButton
				aria-label="go to preferences"
				form="square"
				icon={<Icon icon="list" size={32} />}
				size="S"
				variant="tertiary"
				onClick={onOpenSidebarDrawer}
				className={styles.burger}
			/>
		</header>
	);
};
