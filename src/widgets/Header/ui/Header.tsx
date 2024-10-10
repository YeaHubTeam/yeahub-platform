import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import { ROUTES } from '@/shared/config/router/routes';
import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { BurgerMenu } from '@/shared/ui/BurgerMenu';

import { UserPreferences } from '@/features/common/user-preferences';
// import { ThemeSwitcher } from '@/features/theme/switch-theme';

import { LanguageSwitcher } from '@/features/internationalization/switch-language';

import styles from './Header.module.css';

const MemoHeader = () => {
	const navigate = useNavigate();
	const { isMobile } = useScreenSize();

	const menuItems = [
		{ id: '1', label: 'Home', path: ROUTES.appRoute },
		{ id: '2', label: 'Profile', path: ROUTES.profile.page },
		{ id: '3', label: 'Interview', path: ROUTES.interview.page },
		{ id: '4', label: 'Edit', path: ROUTES.profile.edit.page },
	];

	const handleMenuClick = (path: string) => {
		navigate(path);
	};

	return (
		<header className={styles.header}>
			{isMobile && (
				<NavLink to={ROUTES.appRoute} className={styles.logo}>
					<Logo className={styles.name} />
				</NavLink>
			)}

			{/* <ThemeSwitcher /> */}
			<UserPreferences />
			<LanguageSwitcher />

			{isMobile && (
				<BurgerMenu
					className={styles.burger}
					menuItems={menuItems.map((item) => ({
						...item,
						onClick: () => handleMenuClick(item.path),
					}))}
				/>
			)}
		</header>
	);
};

export const Header = React.memo(MemoHeader);
