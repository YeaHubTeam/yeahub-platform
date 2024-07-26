import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Logo from '@/shared/assets/icons/logo.svg';
import { BurgerMenu } from '@/shared/ui/BurgerMenu';

import { UserPreferences } from '@/features/common/user-preferences';
import { ThemeSwitcher } from '@/features/theme/switch-theme';

import styles from './Header.module.css';

const MemoHeader: FC = () => {
	const navigate = useNavigate();

	const menuItems = [
		{ id: '1', label: 'Home', path: '/' },
		{ id: '2', label: 'Profile', path: '/profile' },
		{ id: '3', label: 'Interview', path: '/interview' },
		{ id: '4', label: 'Edit', path: '/edit' },
	];

	const handleMenuClick = (path: string) => {
		navigate(path);
	};

	return (
		<header className={styles.header}>
			<NavLink to="/" className={styles.logo}>
				<Logo className={styles.name} />
			</NavLink>
			<ThemeSwitcher />
			<UserPreferences />
			<BurgerMenu
				className={styles.burger}
				menuItems={menuItems.map((item) => ({
					...item,
					onClick: () => handleMenuClick(item.path),
				}))}
			/>
		</header>
	);
};

export const Header = React.memo(MemoHeader);
