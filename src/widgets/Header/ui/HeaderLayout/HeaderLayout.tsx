/* eslint-disable prettier/prettier */
import React from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Flex } from '@/shared/ui/Flex';
import { Icon } from '@/shared/ui/Icon';
import { IconButton } from '@/shared/ui/IconButton';

import { WithFeature } from '@/entities/featureFlag';

import { LanguageSwitcher } from '@/features/internationalization/switch-language';
import { ThemeSwitcher } from '@/features/theme/switch-theme';

import { UserPreferences } from '../UserPreferences/UserPreferences';

import styles from './HeaderLayout.module.css';

interface HeaderProps {
	onOpenSidebarDrawer: () => void;
}

export const Header = ({ onOpenSidebarDrawer }: HeaderProps) => {
	return (
		<header className={styles.header}>
			<NavLink to={ROUTES.appRoute} className={styles.logo}>
				<AppLogo isOpen />
			</NavLink>
			<Flex gap="16" align="center">
				<WithFeature featureId="changeTheme">
					<ThemeSwitcher />
				</WithFeature>
				<WithFeature featureId="changeLanguage">
					<LanguageSwitcher />
				</WithFeature>
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
			</Flex>
		</header>
	);
};
