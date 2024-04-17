import { FC } from 'react';

import CloseSideBarIcon from '@/shared/assets/icons/close-sidebar.svg';
import { AppLogo } from '@/shared/ui/AppLogo';

import { NavSidebarItem } from '../NavSidebarItem/NavSidebarItem';

import styles from './NavSidebarList.module.css';

export const NavSidebarList: FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogo />
				<CloseSideBarIcon className={styles['close-icon']} />
			</div>
			<div className={styles.content}>
				<NavSidebarItem />
			</div>
		</aside>
	);
};
