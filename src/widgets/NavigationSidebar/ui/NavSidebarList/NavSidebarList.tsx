import { FC } from 'react';
import { useDispatch } from 'react-redux';

import OpenSideBarIcon from '@/shared/assets/icons/open-sidebar.svg';
import { AppLogo } from '@/shared/ui/AppLogo';

import { toggleOpenSidebar } from '../../model/slice';
import { NavSidebarItem } from '../NavSidebarItem/NavSidebarItem';

import styles from './NavSidebarList.module.css';

export const NavSidebarList: FC = () => {
	const dispatch = useDispatch();
	const handleToggleSidebar = () => {
		dispatch(toggleOpenSidebar());
	};

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<AppLogo />
				<OpenSideBarIcon className={styles['close-icon']} onClick={handleToggleSidebar} />
			</div>
			<div className={styles.content}>
				<NavSidebarItem />
			</div>
		</aside>
	);
};
