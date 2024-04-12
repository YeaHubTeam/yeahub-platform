import { FC } from 'react';

import CloseSideBarIcon from '@/shared/assets/icons/close-sidebar.svg';
import { AppLogo } from '@/shared/ui/AppLogo';

import { NavigationSidebarItem } from '../NavigationSidebarItem/NavigationSidebarItem';

import styles from './NavigationSidebar.module.css';

export const NavigationSidebar: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogo />
				<CloseSideBarIcon className={styles['close-icon']} />
			</div>
			<div className={styles.content}>
				<NavigationSidebarItem />
			</div>
		</aside>
	);
};
